package com.etisalat.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.etisalat.core.models.LinkModel;
import com.etisalat.core.models.TabImage;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the TabImage
 */
@ExtendWith(AemContextExtension.class)
public class TabImageImplTest {
	
	private final AemContext context = new AemContext();
	private static final String CONTENT_ROOT = "/content";
	
	private static final String CURRENT_PAGE = "/content/tabs";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String TAB_IMAGE_1 = TEST_PAGE_CONTAINER_ROOT + "/tabImageList";
	protected static final String TAB_IMAGE_2 = TEST_PAGE_CONTAINER_ROOT + "/empty";
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(TabImageImpl.class);
		context.load().json("/com/etisalat/core/models/TabImageTest.json", CONTENT_ROOT);
		context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());
	}
	
	@Test
	void testTabImageItems() {
		final int expectedSize = 2;
		context.currentResource(TAB_IMAGE_1);
		TabImage tabImage = context.request().adaptTo(TabImage.class);
		int actual = tabImage.getTabImageItems().size();
		assertEquals(expectedSize, actual);
		LinkModel imageItem = tabImage.getTabImageItems().get(1);
		assertEquals("Tab2", imageItem.getLinkText());
		assertEquals("/content/dam/etisalat/sampletest1.png", imageItem.getLinkUrl());
		assertEquals("/content/dam/etisalat/sampleactivetest1.png", imageItem.getLinkUrlActive());
	}
	
	@Test
	void testEmptyImageList() {
		context.currentResource(TAB_IMAGE_2);
		TabImage tabImage = context.request().adaptTo(TabImage.class);
		assertTrue(tabImage.getTabImageItems().isEmpty());
		
	}

}
