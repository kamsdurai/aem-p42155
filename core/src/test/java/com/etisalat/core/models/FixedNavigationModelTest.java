package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the FixedNavigationModel
 */
@ExtendWith(AemContextExtension.class)
class FixedNavigationModelTest {

	private final AemContext context = new AemContext();

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(FixedNavigationModel.class);
		context.load().json("/com/etisalat/core/models/FixedNavigationTest.json", "/content");
		context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());

	}

	@Test
	void testNavigationLinks() {
		final int expectedSize = 2;
		context.currentResource("/content/fixednavigation");
		FixedNavigationModel fixedNav = context.request().adaptTo(FixedNavigationModel.class);
		int actual = fixedNav.getFixedNav().size();
		assertEquals(expectedSize, actual);
		assertEquals("#personal", fixedNav.getFixedNav().get(1).getNavigationLink());
		assertEquals("Personal", fixedNav.getFixedNav().get(1).getNavigationTitle());
	}

	@Test
	void testEmptyLinks() {
		context.currentResource("/content/empty");
		FixedNavigationModel fixedNav = context.request().adaptTo(FixedNavigationModel.class);
		assertTrue(fixedNav.getFixedNav().isEmpty());
	}

	@Test
	void testHtmlExtension() {
		final String expected = "/content/en.html";
		context.currentResource("/content/with-extension");
		FixedNavigationModel fixedNav = context.request().adaptTo(FixedNavigationModel.class);
		String actual = fixedNav.getFixedNav().get(1).getNavigationLink();
		assertEquals(expected, actual);
	}

}
