package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class FixedNavigationMultifieldModelTest {

	private final AemContext context = new AemContext();
	
	private static final String CONTENT_ROOT = "/content";
	
	private static final String CONTENT_FIXED_NAV = "/content/fixednavigation/fixedItems/item0";

	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(FixedNavigtaionMultifieldModel.class);
		context.load().json("/com/etisalat/core/models/FixedNavigationTest.json", CONTENT_ROOT);
		
	}
	@Test
	 void testFixedNavigationItems() {
		final String expectedFixedNavLink = "#overview";
		final String expectedFixedNavTitle = "Overview";
		final String expectedFixedNavDesc = "sampledesc";
		final String expectedFixedNavImage = "/content/dam/sample.png";
		Resource resource = context.resourceResolver().getResource(CONTENT_FIXED_NAV);
		
		FixedNavigtaionMultifieldModel item = resource.adaptTo(FixedNavigtaionMultifieldModel.class);
		item.setNavigationLink(expectedFixedNavLink);
		assertEquals(expectedFixedNavLink, item.getNavigationLink());
		item.setNavigationDesc(expectedFixedNavDesc);
		assertEquals(expectedFixedNavDesc, item.getNavigationDesc());
		item.setNavigationTitle(expectedFixedNavTitle);
		assertEquals(expectedFixedNavTitle, item.getNavigationTitle());
		item.setNavigationImage(expectedFixedNavImage);
		assertEquals(expectedFixedNavImage, item.getNavigationImage());
	}

	
}
