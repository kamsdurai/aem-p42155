package com.etisalat.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class HeroLinkSectionTest {

	private final AemContext context = new AemContext();

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(HeroLinkSection.class);
		context.load().json("/com/etisalat/core/models/HeroLinkSectionTest.json", "/content/etisalat");
	}

	@Test
	void testGetHeroLinkSectionList() {		
		context.currentResource("/content/etisalat/en/jcr:content/root/container/pagenavigation");
		final String expectedIconImage = "/content/dam/etisalat/433/quick-pay-recharge.svg";
		final String expectedIconText = "<p>Quick Pay &amp; Recharge</p>";
		final String expectedLinkTarget = "_blank";
		final String expectedLink ="/content/etisalat/en.html";
		HeroLinkSection heroLinkSection = context.request().adaptTo(HeroLinkSection.class);
		HeroLinkSectionVO item  = heroLinkSection.getHeroLinkSectionList().get(0);
		String actualIconImage = item.getIconImage();
		String actualIconText = item.getIconText();
		String actualLinkTarget= item.getLinkTarget();
		String actualLink = item.getIconLink();		
		assertEquals(expectedIconImage, actualIconImage);
		assertEquals(expectedIconText, actualIconText);
		assertEquals(expectedLinkTarget, actualLinkTarget);
		assertEquals(expectedLink, actualLink);

	}		

}