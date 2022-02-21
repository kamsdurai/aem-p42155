/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the GenericListModel
 */
@ExtendWith(AemContextExtension.class)
class GenericListModelTest {

	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/genericlist";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String GENERIC_LIST_1 = TEST_PAGE_CONTAINER_ROOT + "/singlegenericlist";
	protected static final String GENERIC_LIST_2 = TEST_PAGE_CONTAINER_ROOT + "/multiplegenericlist";
	protected static final String GENERIC_LIST_3 = TEST_PAGE_CONTAINER_ROOT + "/empty";
	protected static final String GENERIC_LIST_4 = TEST_PAGE_CONTAINER_ROOT + "/invalidpage";

	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(GenericListModel.class);
		context.load().json("/com/etisalat/core/models/GenericListModelTest.json", CONTENT_ROOT);
		context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());
	}

	@Test
	void testGenericListWithSingleChildPage() {
		final int expectedSize = 1;
		context.currentResource(GENERIC_LIST_1);

		GenericListModel genericListModel = context.request().adaptTo(GenericListModel.class);
		int actual = genericListModel.getGenericListObj().size();
		assertEquals(expectedSize, actual);
	}

	@Test
	void testGenericListWithMultipleChildPages() {
		final int expectedSize = 3;
		context.currentResource(GENERIC_LIST_2);

		GenericListModel genericListModel = context.request().adaptTo(GenericListModel.class);
		int actual = genericListModel.getGenericListObj().size();
		assertEquals(expectedSize, actual);
	}

	@Test
	void testEmptyGenericList() {
		context.currentResource(GENERIC_LIST_3);
		GenericListModel genericListModel = context.request().adaptTo(GenericListModel.class);
		assertNull(genericListModel);
	}
	
	@Test
	void testInvalidRootPath() {
		context.currentResource(GENERIC_LIST_4);
		GenericListModel genericListModel = context.request().adaptTo(GenericListModel.class);
		assertTrue(genericListModel.getGenericListObj().isEmpty());
	}

	@Test
	void testGenericList() {
		final String imageExpected = "/content/dam/etisalat/sample.png";
		final String offTimeExpected = "2021-07-22";
		final String titleExpected = "Page 1_1";
		final String descExpected = "Page 1_1 description";
		context.currentResource(GENERIC_LIST_1);
		GenericListModel genericListModel = context.request().adaptTo(GenericListModel.class);
		GenericListPageDetails genericListPageDetails = genericListModel.getGenericListObj().get(0);
		String actualImage = genericListPageDetails.getThumbnail();
		Calendar offDate = genericListPageDetails.getOffTime();
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
		String actualOffDate = format1.format(offDate.getTime());
		String actualTitle = genericListPageDetails.getTitle();
		String actualDescription = genericListPageDetails.getDescription();

		assertEquals(imageExpected, actualImage);
		assertEquals(offTimeExpected, actualOffDate);
		assertEquals(titleExpected, actualTitle);
		assertEquals(descExpected, actualDescription);
	}

}
