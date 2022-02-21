package com.etisalat.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.etisalat.core.models.EtisalatBreadcrumb;
import com.etisalat.core.models.EtisalatBreadcrumbVO;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the EtisalatBreadcrumbImpl Class
 */
@ExtendWith(AemContextExtension.class)
class EtisalatBreadcrumbImplTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/etisalatbreadcrumb";
	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	private static final String CARD_DATA = TEST_PAGE_CONTAINER_ROOT + "/etisalatbreadcrumb";

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(EtisalatBreadcrumbImpl.class);
		context.load().json("/com/etisalat/core/models/EtisalatBreadcrumbTest.json", CONTENT_ROOT);		
	}

	@Test
	void testGetEtisalatBreadcrumbItems() {
		Resource navItemRes = context.currentResource(CARD_DATA);
		context.currentResource(CARD_DATA);
		final String expectedBreadcrumbTitle = "title1";
		final String expectedBreadcrumbLink = "/content/etisalat/ae-qa/en/c";
		final String expectedLinkBehavior ="opennewwindow";
		EtisalatBreadcrumb breadcrumbList = context.request().adaptTo(EtisalatBreadcrumb.class);
		EtisalatBreadcrumbVO breadcrumbListItem = breadcrumbList.getEtisalatBreadcrumbItems().get(0);
		String actualBreadcrumbTitle = breadcrumbListItem.getBreadcrumbTitle();
		String actualBreadcrumbLink = breadcrumbListItem.getBreadcrumbLink();
		String actualLinkBehavior = breadcrumbListItem.getLinkBehavior();
		assertEquals(expectedBreadcrumbTitle, actualBreadcrumbTitle);
		assertEquals(expectedBreadcrumbLink, actualBreadcrumbLink);
		assertEquals(expectedLinkBehavior, actualLinkBehavior);

	}		

}
