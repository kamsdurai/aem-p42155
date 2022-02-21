package com.etisalat.core.models.impl;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMException;
import com.etisalat.core.models.*;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * JUnit test verifying the MegaNavigation
 */
@ExtendWith(AemContextExtension.class)
class MegaNavigationImplTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/meganavigation";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String MEGA_NAV_1 = TEST_PAGE_CONTAINER_ROOT + "/megaNavigationList";
	protected static final String MEGA_NAV_2 = TEST_PAGE_CONTAINER_ROOT + "/megaNavigationSubList";
	protected static final String MEGA_NAV_3 = TEST_PAGE_CONTAINER_ROOT + "/utilityNavigationList";
	protected static final String MEGA_NAV_4 = TEST_PAGE_CONTAINER_ROOT + "/empty";
	protected static final String MEGA_NAV_5 = TEST_PAGE_CONTAINER_ROOT + "/topnav";
	protected static final String MEGA_SUBNAV = TEST_PAGE_CONTAINER_ROOT + "/pages/page_1/page_1_1";
	protected static final String MEGA_XF_NAV_6 = TEST_PAGE_CONTAINER_ROOT + "/xfContainerList";


	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(MegaNavigationImpl.class);
		context.load().json("/com/etisalat/core/models/MegaNavigationImplTest.json", CONTENT_ROOT);
		context.load().json("/com/etisalat/core/models/SamplePage.json", "/content/etisalat/ae/en");
		context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());
	}

	@Test
	void testMegaNavMenuItems() {
		final int expectedSize = 2;
		final String expectedMenuLabel = "MainMenu1";
		final String expectedLogo = "/content/dam/ewallet/logo.jpeg";
		context.currentResource(MEGA_NAV_1);

		MegaNavigation megaNavigationModel = context.request().adaptTo(MegaNavigation.class);
		MegaNavigationItem navigationItem = megaNavigationModel.getMegaNavigationItems().get(0);
		String actualMenuLabel = navigationItem.getNavigationLabel();

		int actual = megaNavigationModel.getMegaNavigationItems().size();
		String actualImage = megaNavigationModel.getImagePath();
		assertEquals(expectedSize, actual);
		assertEquals(expectedMenuLabel, actualMenuLabel);
		assertEquals(expectedLogo, actualImage);
	}

	@Test
	void testMegaNavSubMenuItems() {
		final String expectedMenuLabel = "Submenulabel1";
		final String expectedActiveItem = "active";
		context.currentResource(MEGA_NAV_2);
		context.requestPathInfo().setResourcePath(MEGA_SUBNAV);

		MegaNavigation megaNavigationModel = context.request().adaptTo(MegaNavigation.class);
		MegaNavigationItem navigationItem = megaNavigationModel.getMegaNavigationItems().get(0);
		String actualMenuLabel = navigationItem.getSubNavigationList().get(0).getSubNavLabel();
		String actualActiveItem = navigationItem.getActive();

		assertEquals(expectedMenuLabel, actualMenuLabel);
		assertEquals(expectedActiveItem, actualActiveItem);
	}

	@Test
	void testUtilityNavItems() {
		final String expectedLinkSubLabel = "SubLinkLabel1";
		final String expectedLinkMenuLabel = "LinkMenu1";
		context.currentResource(MEGA_NAV_3);

		MegaNavigation megaNavigationModel = context.request().adaptTo(MegaNavigation.class);
		MegaNavigationItem utilityItem = megaNavigationModel.getUtilityNavItems().get(0);
		String actualLinkLabel = utilityItem.getNavigationLabel();
		String actualSubLinkLabel = utilityItem.getSubNavigationList().get(0).getSubNavLabel();

		assertEquals(expectedLinkSubLabel, actualSubLinkLabel);
		assertEquals(expectedLinkMenuLabel, actualLinkLabel);
	}

	@Test
	void testEmptyNavList() {
		context.currentResource(MEGA_NAV_4);
		MegaNavigation genericListModel = context.request().adaptTo(MegaNavigation.class);
		assertTrue(genericListModel.getMegaNavigationItems().isEmpty());
		assertTrue(genericListModel.getUtilityNavItems().isEmpty());
	}

	@Test
	 void testNavLinkHtmlExtension() throws WCMException {
		final String expected = "/content/etisalat/ae/home.html";
		Page page = context.pageManager().create("/content/etisalat/ae", "home",
				"etisalat/templates/homepage", "title1", true);
		context.currentResource(MEGA_NAV_1);
		MegaNavigation megaNavigationModel = context.request().adaptTo(MegaNavigation.class);
		MegaNavigationItem navigationItem = megaNavigationModel.getMegaNavigationItems().get(0);
		String actual = navigationItem.getNavigationLinkTo();
		assertEquals(expected, actual);
		context.pageManager().delete(page, false);

	}

	@Test
	 void testNavigationLogoLink() throws WCMException {
		final String expectedLink = "/content/etisalat/ae/en/index.html";
		context.currentResource(MEGA_NAV_1);
		MegaNavigation megaNavigationModel = context.request().adaptTo(MegaNavigation.class);

		String actual = megaNavigationModel.getLogoMenuLink();
		assertEquals(expectedLink, actual);
	}

	@Test
	void testXFContainerMenuItems() {
		final String expectedMenuLabel = "Mobile plans";
		context.currentResource(MEGA_XF_NAV_6);

		MegaNavigation megaNavigationModel = context.request().adaptTo(MegaNavigation.class);
		MegaNavigationItem navigationItem = megaNavigationModel.getMegaContainerItems().get(0);
		MegaFixedNavigationItem subMenuItem = navigationItem.getContainerSubMenuList().get(0);
		MegaTeaserModel promotionItem = navigationItem.getContainerPromotionList().get(0);
		FixedNavigtaionMultifieldModel footerItem = navigationItem.getContainerFooterMenuList().get(0).getFixedItems()
				.get(0);

		String featureTitle = navigationItem.getContainerSubMenuList().get(2).getTitle();
		assertEquals(2, subMenuItem.getFixedItems().size());
		assertEquals(expectedMenuLabel, navigationItem.getNavigationLabel());
		assertEquals("/content/dam/ewallet/sampletest.jpg", promotionItem.getFileReference());
		assertEquals("My Etisalat App", footerItem.getNavigationTitle());
		assertEquals("Top brands", featureTitle);

	}

	@Test
	void testTopNavMenuItems() {
		final int expectedSize = 2;
		final String expectedMenuLink = "#topnavlink1";
		final String expectedMenuLabel = "CONSUMER";
		context.currentResource(MEGA_NAV_1);

		MegaNavigation megaNavigationModel = context.request().adaptTo(MegaNavigation.class);
		FixedNavigtaionMultifieldModel topNavModel = megaNavigationModel.getTopNavMenuItems().get(0);

		assertEquals(expectedSize, megaNavigationModel.getTopNavMenuItems().size());
		assertEquals(expectedMenuLabel, topNavModel.getNavigationTitle());
		assertEquals(expectedMenuLink, topNavModel.getNavigationLink());
	}


	@Test
	void testTopNavIconMenuItems() {
		final int expectedSize = 2;
		final String expectedMenuLink = "#findus";
		final String expectedMenuLabel = "FindUS";
		final String expectedMenuImage = "/content/dam/sample.png";
		context.currentResource(MEGA_NAV_1);

		MegaNavigation megaNavigationModel = context.request().adaptTo(MegaNavigation.class);
		FixedNavigtaionMultifieldModel topNavModel = megaNavigationModel.getTopNavIconMenuItems().get(0);

		assertEquals(expectedSize, megaNavigationModel.getTopNavMenuItems().size());
		assertEquals(expectedMenuLabel, topNavModel.getNavigationTitle());
		assertEquals(expectedMenuLink, topNavModel.getNavigationLink());
		assertEquals(expectedMenuImage, topNavModel.getNavigationImage());
	}

}
