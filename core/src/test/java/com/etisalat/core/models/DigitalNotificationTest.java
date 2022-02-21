package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the DigitalNotification Sling modal Class
 */
@ExtendWith(AemContextExtension.class)
class DigitalNotificationTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/notification";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String NOTIFICATION_DATA = TEST_PAGE_CONTAINER_ROOT + "/digitalnotifications";

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(ProductDetailsItem.class);
		context.load().json("/com/etisalat/core/models/DigitalNotification.json", CONTENT_ROOT);
	}

	@Test
	void testProductDetailsItem() {
		final String expectedLinkURL = "/content/etisalat/samplepage.html";
		final String expectedNotificationCTA = "https://www.etisalat.ae/en/index.jsp";

		Resource resource = context.resourceResolver().getResource(NOTIFICATION_DATA);
		DigitalNotification item = resource.adaptTo(DigitalNotification.class);
		item.setNotificationCTALink(expectedNotificationCTA);
		assertEquals(expectedNotificationCTA, item.getNotificationCTALink());
		item.setTitleLink(expectedLinkURL);
		assertEquals(expectedLinkURL, item.getTitleLink());
	}

}
