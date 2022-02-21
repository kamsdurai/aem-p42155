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
 * JUnit test verifying the MegaSubNavigationItem
 */
@ExtendWith(AemContextExtension.class)
class MegaSubNavigationItemTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/meganavigation";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String MEGA_NAV_1 = TEST_PAGE_CONTAINER_ROOT
			+ "/megaNavigationSubList/navigationItems/item0/subNavItems/item0";
	protected static final String MEGA_NAV_2 = TEST_PAGE_CONTAINER_ROOT
			+ "/megaNavigationSubList/navigationItems/item0/subNavItems";
	protected static final String MEGA_SUBNAV = TEST_PAGE_CONTAINER_ROOT + "/pages/page_1/page_1_1";

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(MegaSubNavigationItem.class);
		context.load().json("/com/etisalat/core/models/MegaNavigationImplTest.json", CONTENT_ROOT);
	}

	@Test
	void testMegaNavMenuItem() {
		final String expectedMenuLabel = "Submenulabel1";
		final String expectedAltText = "Submenualteext1";

		Resource resource = context.resourceResolver().getResource(MEGA_NAV_1);
		MegaSubNavigationItem item = resource.adaptTo(MegaSubNavigationItem.class);

		item.setSubNavLabel(expectedMenuLabel);
		assertEquals(expectedMenuLabel, item.getSubNavLabel());
		item.setSubNavLinkTo(MEGA_SUBNAV);
		assertEquals(MEGA_SUBNAV, item.getSubNavLinkTo());
		item.setSubNavTitle(expectedAltText);
		assertEquals(expectedAltText, item.getSubNavTitle());
	}

	@Test
	void testMegaNavigationEmpty() {
		Resource resource = context.resourceResolver().getResource(MEGA_NAV_2);
		MegaSubNavigationItem item = resource.adaptTo(MegaSubNavigationItem.class);

		assertNull(item.getSubNavLabel());
		assertNull(item.getSubNavLinkTo());
		assertNull(item.getSubNavTitle());
	}

}
