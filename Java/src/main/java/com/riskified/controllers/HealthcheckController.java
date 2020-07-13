package com.riskified.controllers;

import com.riskified.common.Constants;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class HealthcheckController {

	private final RestTemplate restTemplate;
	private final String creditCardServiceHealthcheckUrl = Constants.CREDIT_CARD_SERVICE_URL + "/healthcheck";

	public HealthcheckController(RestTemplateBuilder restTemplateBuilder) {
		this.restTemplate = restTemplateBuilder.build();
	}


	@GetMapping("/healthcheck")
	public ResponseEntity<String> healthcheck() {
		try {
			this.restTemplate.getForObject(creditCardServiceHealthcheckUrl, String.class);

			return new ResponseEntity<>("OK", HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<>("Credit card service is unavailable! please contact your interviewer!", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
