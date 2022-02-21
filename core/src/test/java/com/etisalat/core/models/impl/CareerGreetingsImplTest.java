package com.etisalat.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.etisalat.core.models.CareerGreetings;
import com.etisalat.core.models.LinkModel;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the CareerGreetingsImpl Class
 */
@ExtendWith(AemContextExtension.class)
class CareerGreetingsImplTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/career_greetings";
	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	private static final String CARD_DATA = TEST_PAGE_CONTAINER_ROOT + "/career_greetings";

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(CareerGreetingsImpl.class);
		context.load().json("/com/etisalat/core/models/CareerGreetingsTest.json", CONTENT_ROOT);		
	}

	@Test
	void testTitles() {
		String expectedPretitle = "SMART HUB DATA CENTER";
		String expectedTitle = "Connectivity Services";
		String expectedDescription = "description";
		Resource resource = context.currentResource(CARD_DATA);
		context.currentResource(CARD_DATA);
		CareerGreetings careerGreetings = context.request().adaptTo(CareerGreetings.class);
		String actualPretitle = careerGreetings.getPreTitle();
		String actualTitle = careerGreetings.getTitle();
		String actualDescription = careerGreetings.getDescription();
		assertEquals(expectedPretitle,actualPretitle);
		assertEquals(expectedTitle,actualTitle);
		assertEquals(expectedDescription,actualDescription);
	}	

	@Test
	void testImages() {
		Resource resource = context.currentResource(CARD_DATA);
		context.currentResource(CARD_DATA);
		CareerGreetings careerGreetings = context.request().adaptTo(CareerGreetings.class);
		LinkModel image = careerGreetings.getImage();
		LinkModel cover = careerGreetings.getCover();
		assertNotNull(image);
		assertNotNull(cover);
	}

}
