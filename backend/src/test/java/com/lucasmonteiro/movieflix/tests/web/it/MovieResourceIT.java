package com.lucasmonteiro.movieflix.tests.web.it;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

import com.lucasmonteiro.movieflix.dto.MovieDTO;
import com.lucasmonteiro.movieflix.dto.ReviewDTO;
import com.lucasmonteiro.movieflix.repositories.MovieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class MovieResourceIT {

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private ObjectMapper objectMapper;
	
	JacksonJsonParser jsonParser = new JacksonJsonParser();
	
	@Value("${security.oauth2.client.client-id}")
	private String clientId;

	@Value("${security.oauth2.client.client-secret}")
	private String clientSecret;

	private long existingId;
	private long nonExistingId;
	private long genreId;
	private String visitorUsername;
	private String visitorPassword;
	private String memberUsername;
	private String memberPassword;
	
	@BeforeEach
	void setUp() throws Exception {

		existingId = 1L;
		nonExistingId = 100000L;
		genreId = 1L;
		
		visitorUsername = "bob@gmail.com";
		visitorPassword = "123456";
		memberUsername = "ana@gmail.com";
		memberPassword = "123456";
	}

	@Test
	public void findByIdShouldReturnUnauthorizedWhenNotValidToken() throws Exception {

		ResultActions result =
				mockMvc.perform(get("/movies/{id}", existingId)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isUnauthorized());
	}	

	@Test
	public void findByIdShouldReturnMovieAndReviewsWhenUserVisitorAuthenticated() throws Exception {

		String accessToken = obtainAccessToken(visitorUsername, visitorPassword);
		
		ResultActions result =
				mockMvc.perform(get("/movies/{id}", existingId)
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.reviews").exists());
		Assertions.assertTrue(getReviews(result).length >= 0);
	}

	@Test
	public void findByIdShouldReturnMovieAndReviewsWhenMemberAuthenticated() throws Exception {

		String accessToken = obtainAccessToken(memberUsername, memberPassword);
		
		ResultActions result =
				mockMvc.perform(get("/movies/{id}", existingId)
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.reviews").exists());
		Assertions.assertTrue(getReviews(result).length >= 0);
	}

	@Test
	public void findByIdShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {

		String accessToken = obtainAccessToken(visitorUsername, visitorPassword);
		
		ResultActions result =
				mockMvc.perform(get("/movies/{id}", nonExistingId)
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void findAllPagedShouldReturnUnauthorizedWhenNoTokenGiven() throws Exception {

		ResultActions result =
				mockMvc.perform(get("/movies")
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isUnauthorized());
	}	

	@Test
	public void findAllPagedShouldReturnOrderedPageWhenVisitorAuthenticated() throws Exception {

		String accessToken = obtainAccessToken(visitorUsername, visitorPassword);

		long countMovies = movieRepository.count();
		
		ResultActions result =
				mockMvc.perform(get("/movies")
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.content").exists());
		result.andExpect(jsonPath("$.totalElements").value(countMovies));		
		Assertions.assertTrue(orderedByTitle(getMovies(result)));
	}

	@Test
	public void findAllPagedShouldReturnOrderedPageWhenMemberAuthenticated() throws Exception {

		String accessToken = obtainAccessToken(memberUsername, memberPassword);

		long countMovies = movieRepository.count();
		
		ResultActions result =
				mockMvc.perform(get("/movies")
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.content").exists());
		result.andExpect(jsonPath("$.totalElements").value(countMovies));		
		Assertions.assertTrue(orderedByTitle(getMovies(result)));
	}

	@Test
	public void findAllPagedShouldReturnFilteredMoviesWhenGenreIsInformed() throws Exception {

		String accessToken = obtainAccessToken(visitorUsername, visitorPassword);

		ResultActions result =
				mockMvc.perform(get("/movies?genreId=" + genreId)
					.header("Authorization", "Bearer " + accessToken)
					.contentType(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.content").exists());
		Assertions.assertTrue(getMovies(result).length > 0);
		Assertions.assertTrue(allMoviesGenresMatch(getMovies(result), genreId));
	}
	
	private MovieDTO[] getMovies(ResultActions result) throws Exception {
		String json = result.andReturn().getResponse().getContentAsString();
		JsonNode node = objectMapper.readValue(json, ObjectNode.class).get("content");
		return objectMapper.convertValue(node, MovieDTO[].class);
	}
	
	private ReviewDTO[] getReviews(ResultActions result) throws Exception {
		String json = result.andReturn().getResponse().getContentAsString();
		JsonNode node = objectMapper.readValue(json, ObjectNode.class).get("reviews");
		return objectMapper.convertValue(node, ReviewDTO[].class);
	}
	
	private boolean orderedByTitle(MovieDTO[] movies) {
		for (int i = 1; i < movies.length; i++) {
			if (movies[i-1].getTitle().compareTo(movies[i].getTitle()) > 0) {
				return false;
			}
		}
		return true;
	}
	
	private boolean allMoviesGenresMatch(MovieDTO[] movies, long genreId) {
		for (MovieDTO movie : movies) {
			if (movie.getGenreId() != genreId) { // MovieDTO -> Long genreId
				return false;
			}
		}
		return true;
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
