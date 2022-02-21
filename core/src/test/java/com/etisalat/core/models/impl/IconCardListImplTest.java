package com.etisalat.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.etisalat.core.models.IconCardList;
import com.etisalat.core.models.IconCardVO;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the IconcardListImpl Class
 */
@ExtendWith(AemContextExtension.class)
class IconCardListImplTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/iconcardlist";
	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	private static final String CARD_DATA = TEST_PAGE_CONTAINER_ROOT + "/iconcardlist";

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(IconCardListImpl.class);
		context.load().json("/com/etisalat/core/models/IconCardListTest.json", CONTENT_ROOT);		
	}

	@Test
	void testGetIConCardListItems() {
		Resource navItemRes = context.currentResource(CARD_DATA);
		context.currentResource(CARD_DATA);
		final String expectedCardTitle = "Card Title 1";
		final String expectedCardLink = "/content/etisalat/ae/en/carrier-and-wholesale/help";
		final String expectedCardIcon = "/content/dam/etisalat/internet.svg";
		final String expectedLinkBehavior ="opennewwindow";
		int expectedCardSize = 2;
		IconCardList iconCardList = context.request().adaptTo(IconCardList.class);
		IconCardVO iconCardListItem = iconCardList.getIconCardListItems().get(0);
		String actualCardTitle = iconCardListItem.getCardTitle();
		String actualCardLink = iconCardListItem.getCardLink();
		String actualCardIcon = iconCardListItem.getCardIcon();
		String actualLinkBehavior = iconCardListItem.getLinkBehavior();
		int actualCardSize = iconCardList.getIconCardSize();
		assertEquals(expectedCardTitle, actualCardTitle);
		assertEquals(expectedCardLink, actualCardLink);
		assertEquals(expectedCardIcon, actualCardIcon);
		assertEquals(expectedCardSize, actualCardSize);
		assertEquals(expectedLinkBehavior, actualLinkBehavior);

	}		

}
