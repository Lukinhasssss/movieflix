package com.lucasmonteiro.movieflix.tests.web.it;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.lucasmonteiro.movieflix.dto.ReviewDTO;
import com.lucasmonteiro.movieflix.repositories.ReviewRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ReviewResourceIT {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Value("${security.oauth2.client.client-id}")
	private String clientId;

	@Value("${security.oauth2.client.client-secret}")
	private String clientSecret;

	private ReviewDTO newReviewDTO;
	private String visitorUsername;
	private String visitorPassword;
	private String memberUsername;
	private String memberPassword;
	
	@BeforeEach
	void setUp() throws Exception {
		
		visitorUsername = "bob@gmail.com";
		visitorPassword = "123456";
		memberUsername = "ana@gmail.com";
		memberPassword = "123456";
		
		newReviewDTO = new ReviewDTO();
		newReviewDTO.setText("Good good good");
		newReviewDTO.setMovieId(1L);
	}

	@Test
	public void insertShouldReturnUnauthorizedWhenNotValidToken() throws Exception {

		String jsonBody = objectMapper.writeValueAsString(newReviewDTO);
		
		ResultActions result =
				mockMvc.perform(post("/reviews")
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isUnauthorized());
	}
	
	@Test
	public void insertShouldReturnForbiddenWhenVisitorAuthenticated() throws Exception {
	
		String accessToken = obtainAccessToken(visitorUsername, visitorPassword);
		
		String jsonBody = objectMapper.writeValueAsString(newReviewDTO);
		
		ResultActions result =
				mockMvc.perform(post("/reviews")
						.header("Authorization", "Bearer " + accessToken)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isForbidden());
	}
	
	@Test
	public void insertShouldInsertReviewWhenMemberAuthenticatedAndValidData() throws Exception {
		
		String accessToken = obtainAccessToken(memberUsername, memberPassword);
		
		String jsonBody = objectMapper.writeValueAsString(newReviewDTO);
		
		long expectedCount = reviewRepository.count() + 1;
		
		ResultActions result =
				mockMvc.perform(post("/reviews")
						.header("Authorization", "Bearer " + accessToken)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.user").exists());
		result.andExpect(jsonPath("$.user.id").exists());
		result.andExpect(jsonPath("$.user.name").exists());
		result.andExpect(jsonPath("$.user.email").value(memberUsername));
		Assertions.assertEquals(expectedCount, reviewRepository.count());
	}

	@Test
	public void insertShouldReturnUnproccessableEntityWhenMemberAuthenticatedAndInvalidData() throws Exception {
		
		String accessToken = obtainAccessToken(memberUsername, memberPassword);
		
		newReviewDTO.setText("     ");
		String jsonBody = objectMapper.writeValueAsString(newReviewDTO);
		
		ResultActions result =
				mockMvc.perform(post("/reviews")
						.header("Authorization", "Bearer " + accessToken)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isUnprocessableEntity());
	}

	private String obtainAccessToken(String username, String password) throws Exception {

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "password");
		params.add("client_id", clientId);
		params.add("username", username);
		params.add("password", password);

		ResultActions result = mockMvc
				.perform(post("/oauth/token").params(params).with(httpBasic(clientId, clientSecret))
						.accept("application/json;charset=UTF-8"))
				.andExpect(status().isOk()).andExpect(content().contentType("application/json;charset=UTF-8"));

		String resultString = result.andReturn().getResponse().getContentAsString();

		JacksonJsonParser jsonParser = new JacksonJsonParser();
		return jsonParser.parseMap(resultString).get("access_token").toString();
	}
}
