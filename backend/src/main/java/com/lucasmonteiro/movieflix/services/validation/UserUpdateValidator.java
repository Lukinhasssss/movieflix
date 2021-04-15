package com.lucasmonteiro.movieflix.services.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import com.lucasmonteiro.movieflix.dto.UserUpdateDTO;
import com.lucasmonteiro.movieflix.entities.User;
import com.lucasmonteiro.movieflix.repositories.UserRepository;
import com.lucasmonteiro.movieflix.resources.exceptions.FieldMessage;

public class UserUpdateValidator implements ConstraintValidator<UserUpdateValid, UserUpdateDTO> {
	
	@Autowired
	private HttpServletRequest request; // HttpServletRequest guarda as informações da requisição. A partir dele é possível pegar o id da requisição
	
	@Autowired
	private UserRepository repository;
	
	@Override
	public void initialize(UserUpdateValid ann) { // Método que recebe alguma lógica quando o objeto for inicializado
	}

	@Override
	public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) { // Testa se o objeto UserInsertDTO vai ser válido ou não
		
		@SuppressWarnings("unchecked")
		var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		long userId = Long.parseLong(uriVars.get("id"));
		
		List<FieldMessage> list = new ArrayList<>();
		
		// Coloque aqui seus testes de validação, acrescentando objetos FieldMessage à lista
		
		User user = repository.findByEmail(dto.getEmail());
		if (user != null && userId != user.getId()) {
			list.add(new FieldMessage("email", "Email já existe"));
		}
		
		for (FieldMessage e : list) { // Percorre a lista de FieldMessage para inserir os erros na lista de Beans validation
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}
