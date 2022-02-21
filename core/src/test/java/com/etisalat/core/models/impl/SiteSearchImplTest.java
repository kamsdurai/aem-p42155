package com.etisalat.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.etisalat.core.models.SiteSearch;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the SiteSearch
 */
@ExtendWith(AemContextExtension.class)
class SiteSearchImplTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/searchpage";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String SEARCH_1 = TEST_PAGE_CONTAINER_ROOT + "/search1";
	protected static final String PAGE_NAV_2 = TEST_PAGE_CONTAINER_ROOT + "/empty";
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(SiteSearchImpl.class);
		context.load().json("/com/etisalat/core/models/SiteSearchTest.json", CONTENT_ROOT);		
		context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());
	}

	@Test
	void testPageNavigationLinks() {
		context.currentResource(SEARCH_1);
		SiteSearch siteSearch = context.request().adaptTo(SiteSearch.class);
		String expectedQuickLink = "/content/samplepay.html";
		String expectedQuickLinkLabel = "Quick Pay & Recharge";
		String expectedBrandLink = "#";
		String expectedBrandLinkLabel = "Learn More";
		String expectedBrandTitle = "eLife Starter Plan";

		assertEquals(4, siteSearch.getBrandItems().size());
		assertEquals(5, siteSearch.getQuickLinksItems().size());
		assertEquals(expectedQuickLinkLabel, siteSearch.getQuickLinksItems().get(0).getLinkText());
		assertEquals(expectedQuickLink, siteSearch.getQuickLinksItems().get(0).getLinkUrl());
		assertEquals(expectedBrandLinkLabel, siteSearch.getBrandItems().get(0).getLinkText());
		assertEquals(expectedBrandLink, siteSearch.getBrandItems().get(0).getLinkUrl());
		assertEquals(expectedBrandTitle, siteSearch.getBrandItems().get(0).getTitle());		
	}
}
