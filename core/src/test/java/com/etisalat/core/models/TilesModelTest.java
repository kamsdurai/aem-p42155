package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the TilesModel
 */

@ExtendWith(AemContextExtension.class)
class TilesModelTest {
	
	private final AemContext context = new AemContext();
	
	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/testtileboxes";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String TILE_DATA = TEST_PAGE_CONTAINER_ROOT + "/tilecontainer/tile1";
	protected static final String TILE_DATA1 = TEST_PAGE_CONTAINER_ROOT + "/tilecontainer/tile2";
	protected static final String TILE_DATA2 = TEST_PAGE_CONTAINER_ROOT + "/tilecontainer/tile3";
	protected static final String TILE_DATA3 = TEST_PAGE_CONTAINER_ROOT + "/tilecontainer1/tile1";
	protected static final String TILE_DATA4 = TEST_PAGE_CONTAINER_ROOT + "/accessoriescardcontainer/accessoriescardtile";
	protected static final String TILE_DATA5 = TEST_PAGE_CONTAINER_ROOT + "/accessoriescardcontainer1/accessoriescardtile";
	protected static final String FEATURE_DATA = TEST_PAGE_CONTAINER_ROOT + "/container1/features";
	protected static final String BENEFITS_DATA = TEST_PAGE_CONTAINER_ROOT + "/gridcontainer/benefitstile";


	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(TileModel.class);
		context.load().json("/com/etisalat/core/models/TilesModel.json", CONTENT_ROOT);		
	}

	@Test
	void testTiles() {
		String expectedTileTitle = "Mobility";
		String expectedFileReference = "/content/dam/etisalat/elife-tv-gaming-desktop_tcm313-225320.jpg";
		String expectedTileDesc = "<p>Keep your workforce connected anytime, anywhere. Ensure constant business accessibility with our bespoke mobility solutions.</p>";
		context.currentResource(TILE_DATA);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		tileModel.setTiletitle(expectedTileTitle);
		assertEquals(expectedTileTitle, tileModel.getTiletitle());		
		tileModel.setText(expectedTileDesc);
		tileModel.setTileImageResource(tileModel.getTileImageResource());
		assertEquals(expectedTileDesc, tileModel.getText());
		assertEquals(expectedFileReference,
				tileModel.getTileImageResource().getValueMap().get("fileReference", String.class));
		
	}
	@Test
	void testNumberofItems() {
		Long expectedItems = Long.valueOf(4);
		context.currentResource(BENEFITS_DATA);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		tileModel.setNumberOfItems(Long.valueOf(3));
		assertEquals(expectedItems,
				tileModel.getNumberOfItems());

	}

	@Test
	void testQrImage() {
		String expectedFileReference = "/content/dam/etisalat/smart-living-desktop_tcm313-225319.jpg";
		context.currentResource(FEATURE_DATA);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		tileModel.setQrImageResource(tileModel.getQrImageResource());
		assertEquals(expectedFileReference,
				tileModel.getQrImageResource().getValueMap().get("fileReference", String.class));

	}
	
	@Test
	void testTileLink() {
		String expectedCTAText = "Learn More";
		String expectedTileCTALinkNewWindow = "/content/etisalat/ae/en/connectivity.html";
		String expectedTileCTALinkSameWindow = "/content/etisalat/ae/en/connectivity.html";
		context.currentResource(TILE_DATA1);		
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		tileModel.setTileCTALinkNewWindow(expectedTileCTALinkNewWindow);
		tileModel.setTileCTALinkSameWindow(expectedTileCTALinkNewWindow);
		assertEquals(expectedTileCTALinkNewWindow, tileModel.getTileCTALinkNewWindow());
		assertEquals(expectedTileCTALinkSameWindow, tileModel.getTileCTALinkSameWindow());
		tileModel.setCtatext(expectedCTAText);
		assertEquals(expectedCTAText, tileModel.getCtatext());
	}
	
	@Test
	void testTileContianerLayout() {
		String expectedLayout = "tile-box";
		context.currentResource(TILE_DATA2);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		assertEquals(expectedLayout, tileModel.getTileBoxContainerLayout());
	}

	@Test
	void testTileContianerEmptyLayout() {
		String expectedLayout = "";
		context.currentResource(TILE_DATA3);
		TileModel tileModel = context.request().adaptTo(TileModel.class);

		assertEquals(expectedLayout, tileModel.getTileBoxContainerLayout());
	}
	@Test
	void testAccessoriesContainerLayout() {
		String expectedLayout = "recommCard";
		context.currentResource(TILE_DATA4);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		assertEquals(expectedLayout, tileModel.getTileBoxContainerLayout());
	}
	@Test
	void testAccessoriesEmptyLayout() {
		String expectedLayout = "";
		context.currentResource(TILE_DATA5);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		assertEquals(expectedLayout, tileModel.getTileBoxContainerLayout());
	}

	@Test
	void testTileBoxVariation() {
		String expectedLayout = "3-tile-boxes";
		context.currentResource(TILE_DATA2);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		assertEquals(expectedLayout, tileModel.getTileBoxVariation());
	}
	@Test
	void testTileBoxEmptyVariation() {
		String expectedLayout = StringUtils.EMPTY;
		context.currentResource(TILE_DATA3);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		assertEquals(expectedLayout, tileModel.getTileBoxVariation());
	}
	
	@Test
	void testTileTagTitle() {
		context.currentResource(TILE_DATA1);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
	    assertNotNull(tileModel.getCategoryTagTitle());
	}
	
	@Test
	void testTileTag() {
		String expected = "ETISALAT:BUSINESS/SMB/CATEGORY/PRODUCT-RELATED";
		context.currentResource(TILE_DATA1);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		assertEquals(expected, tileModel.getCategoryTag());
	}
	
	@Test
	void testTileTagCase2() {
		String expected = "ETISALAT:BUSINESS/SMB/CATEGORY/PRODUCT-RELATED";
		context.currentResource(TILE_DATA2);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		tileModel.setCategoryTag(expected);
		assertEquals(expected, tileModel.getCategoryTag());
	}
	
	@Test
	void testTileLinkUrl() {
		String expected = "/content/etisalat/en/tile";
		context.currentResource(TILE_DATA1);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		assertEquals(expected, tileModel.getLinkURL());
	}
	
	@Test
	void testTileLinkUrlCase2() {
		String expected = "/content/etisalat/en/tile";
		context.currentResource(TILE_DATA2);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		tileModel.setLinkURL(expected);
		assertEquals(expected, tileModel.getLinkURL());
	}
	
	@Test
	void testTileValidDate() {
		String expected = "22 Dec 2021";
		context.currentResource(TILE_DATA1);
		TileModel tileModel = context.request().adaptTo(TileModel.class);
		tileModel.setValidDateText(expected);
		assertEquals(expected, tileModel.getValidDateText());
	}
}
