package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the MegaNavigationItem
 */
@ExtendWith(AemContextExtension.class)
class MegaNavigationItemTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/meganavigation";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String MEGA_NAV_1 = TEST_PAGE_CONTAINER_ROOT
			+ "/megaNavigationSubList/navigationItems/item0";
	protected static final String MEGA_NAV_2 = TEST_PAGE_CONTAINER_ROOT + "/megaNavigationSubList/navigationItems";

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(MegaNavigationItem.class);
		context.load().json("/com/etisalat/core/models/MegaNavigationImplTest.json", CONTENT_ROOT);
	}

	@Test
	void testMegaNavMenuItem() {
		final String expectedMenuLabel = "MainMenu1";
		final String expectedMenuLink = "/content/etisalat/ae/en";
		final String expectedAltText = "MainMenuAltText1";
		final String expectedXFPath = "/content/experience-fragments/sample";
		final String expectedUtilityMenuLayout = "fixedmenulist";
		final String expectedNavImagePath = "/content/dam/etisalat/samplenavimage.jpg";

		Resource resource = context.resourceResolver().getResource(MEGA_NAV_1);
		MegaNavigationItem item = resource.adaptTo(MegaNavigationItem.class);

		item.setNavigationLabel(expectedMenuLabel);
		item.setNavigationLinkTo(expectedMenuLink);
		item.setNavigationAltText(expectedAltText);
		item.setXfVariationPath(expectedXFPath);
		item.setNavImagePath(expectedNavImagePath);
		item.setUtilityMenuLayout(expectedUtilityMenuLayout);
		
		assertEquals(expectedMenuLabel, item.getNavigationLabel());
		assertEquals(expectedMenuLink, item.getNavigationLinkTo());
		assertEquals(expectedAltText, item.getNavigationAltText());
        assertTrue(item.getSubNavigationList().isEmpty());
        assertEquals(expectedXFPath, item.getXfVariationPath());
		assertEquals(expectedUtilityMenuLayout, item.getUtilityMenuLayout());
		assertEquals(expectedNavImagePath, item.getNavImagePath());
	}

	@Test
	void testMegaNavigationEmpty() {
		Resource resource = context.resourceResolver().getResource(MEGA_NAV_2);
		MegaNavigationItem item = resource.adaptTo(MegaNavigationItem.class);

		assertNull(item.getNavigationLabel());
		assertNull(item.getNavigationLinkTo());
		assertNull(item.getNavigationAltText());
	}
}
