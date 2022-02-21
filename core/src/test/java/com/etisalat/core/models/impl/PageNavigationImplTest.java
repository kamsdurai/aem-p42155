package com.etisalat.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.etisalat.core.models.FixedNavigtaionMultifieldModel;
import com.etisalat.core.models.PageNavigation;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the PageNavigation
 */
@ExtendWith(AemContextExtension.class)
class PageNavigationImplTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/pagenavigationlist";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String PAGE_NAV_1 = TEST_PAGE_CONTAINER_ROOT + "/pagenavigation";
	protected static final String PAGE_NAV_2 = TEST_PAGE_CONTAINER_ROOT + "/empty";
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(PageNavigationImpl.class);
		context.load().json("/com/etisalat/core/models/PageNavigationTest.json", CONTENT_ROOT);
		context.load().json("/com/etisalat/core/models/SamplePage.json", "/content/etisalat/ae/en");
		context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());
	}

	@Test
	void testPageNavigationLinks() {
		final int expectedSize = 4;
		final String expectedTitle = "Prepaid";
		final String expectedPageLink = "/content/etisalat/ae/en/prepaid.html";
		context.currentResource(PAGE_NAV_1);
		PageNavigation pageNav = context.request().adaptTo(PageNavigation.class);

		int actual = pageNav.getPageNavItems().size();
		FixedNavigtaionMultifieldModel pageNavItem = pageNav.getPageNavItems().get(0);
		assertEquals(expectedSize, actual);

		assertEquals(expectedTitle, pageNavItem.getNavigationTitle());
		assertEquals(expectedPageLink, pageNavItem.getNavigationLink());
	}
	
	@Test
	void testEmptyLinks() {
		context.currentResource(PAGE_NAV_2);
		PageNavigation pageNav = context.request().adaptTo(PageNavigation.class);
		assertTrue(pageNav.getPageNavItems().isEmpty());
	}

}
