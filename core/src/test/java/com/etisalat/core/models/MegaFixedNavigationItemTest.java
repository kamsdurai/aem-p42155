package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the MegaFixedNavigationItem
 */
@ExtendWith(AemContextExtension.class)
class MegaFixedNavigationItemTest {

	private final AemContext context = new AemContext();
	private static final String CONTENT_ROOT = "/content";
	
	
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(MegaFixedNavigationItem.class);		
		context.load().json("/com/etisalat/core/models/FixedNavigationTest.json", CONTENT_ROOT);		
	}
	
	@Test
	void testTabImageItems() {		
		final String expectedTitle = "SampleTest";
		final String expectedLink = "#personal";
		final String expectedNavTitle = "Personal";
		final String expectedHeadingTitle = "Add-ons";
		Resource resource = context.resourceResolver().getResource("/content/fixednavigation");
		MegaFixedNavigationItem fixedNav = resource.adaptTo(MegaFixedNavigationItem.class);
		FixedNavigtaionMultifieldModel item = fixedNav.getFixedItems().get(1);
		int actual = fixedNav.getFixedItems().size();
		assertEquals(2, actual);
		
		fixedNav.setNavTitle(expectedTitle);
		fixedNav.setFeatureItemExist(false);
		fixedNav.setFixedItems(fixedNav.getFixedItems());
		fixedNav.setTitle(expectedHeadingTitle);
		assertEquals(expectedLink, item.getNavigationLink());
		assertEquals(expectedNavTitle, item.getNavigationTitle());
		assertEquals(expectedTitle, fixedNav.getNavTitle());
		assertEquals(false, fixedNav.isFeatureItemExist());
		assertEquals(expectedHeadingTitle, fixedNav.getTitle());
	}
	
	@Test
	void testEmptyImageList() {
		context.currentResource("/content/empty");
		MegaFixedNavigationItem fixedNav = context.request().adaptTo(MegaFixedNavigationItem.class);
		assertNull(fixedNav);
	}
}
