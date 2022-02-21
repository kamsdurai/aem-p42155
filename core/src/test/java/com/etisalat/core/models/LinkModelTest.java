package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class LinkModelTest {
	
 private final AemContext context = new AemContext();
	
 private static final String CONTENT_ROOT = "/content";
 private static final String CURRENT_PAGE = "/content/linkdetails";
 private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	
 private static final String CONTENT_LINK = TEST_PAGE_CONTAINER_ROOT+"/quicklinkItems/item0/quicklink/item0";

	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(LinkModel.class);
		context.load().json("/com/etisalat/core/models/LinkModelTest.json", CONTENT_ROOT);		
	}
	
	@Test
	public void testLinkItems() {
	 final String expectedLinkText = "Learn More";
	 final String expectedLinkUrl = "https://www.etisalat.ae/b2c/quick-pay.html";
	 final String expectedAltText = "ContactAltText";
	 final String expectedTitle = "Contact Sales";
	 final String expectedLinkBehavior = "Contact Sales";
	 final String expectedLinkUrlActive = "true";
	 final String imgUrl = "/content/dam/etisalat/ae/en/sample.jpg";
	 final String expectedFileReference = "/content/dam/etisalat/ae/en/gaming-desktop_tcm313-225320.jpg";
	 final String expectedEnableIcon = "true";
	 Resource resource = context.resourceResolver().getResource(CONTENT_LINK);
		
	 LinkModel item = resource.adaptTo(LinkModel.class);
	 item.setLinkText(expectedLinkText);
	 assertEquals(expectedLinkText, item.getLinkText());
	 item.setLinkUrl(expectedLinkUrl);
	 assertEquals(expectedLinkUrl, item.getLinkUrl());
	 item.setAltText(expectedAltText);
	 assertEquals(expectedAltText, item.getAltText());
	 item.setImgUrl(imgUrl);
	 assertEquals(imgUrl, item.getImgUrl());
	 item.setTitle(expectedTitle);
	 assertEquals(expectedTitle, item.getTitle());
	 item.setLinkBehavior(expectedLinkBehavior);
	 assertEquals(expectedLinkBehavior, item.getLinkBehavior());
	 item.setLinkUrlActive(expectedLinkUrlActive);
	 assertEquals(expectedLinkUrlActive, item.getLinkUrlActive());
	 item.setImageResource(item.getImageResource());
	 assertEquals(expectedFileReference,
				item.getImageResource().getValueMap().get("fileReference", String.class));

		item.setEnableIcon(expectedEnableIcon);
		assertEquals(expectedEnableIcon, item.getEnableIcon());
	}

}
