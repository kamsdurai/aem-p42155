package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class QuickLinkModelTest {

  private final AemContext context = new AemContext();
	
  private static final String CONTENT_ROOT = "/content";
  private static final String CURRENT_PAGE = "/content/linkdetails";
  private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	
  private static final String CONTENT_LINK = TEST_PAGE_CONTAINER_ROOT+"/quicklinkItems/item0";
  private static final String CONTENT_LINK1 = TEST_PAGE_CONTAINER_ROOT+"/quicklinkItems/item0/quicklink/item0";


  @BeforeEach
  public void setup() throws Exception {
	context.addModelsForClasses(QuickLinkModel.class,LinkModel.class);
	context.load().json("/com/etisalat/core/models/LinkModelTest.json", CONTENT_ROOT);		
  }

  @Test
  public void testQuickLinkTitle() {
    final String expectedTitle = "Support";    
    Resource resource = context.resourceResolver().getResource(CONTENT_LINK);
	
    QuickLinkModel item = resource.adaptTo(QuickLinkModel.class);
    item.setQuickLinkTitle(expectedTitle);
    assertEquals(expectedTitle, item.getQuickLinkTitle());    
 }
  

  @Test
  public void testQuickLinkItems() {     
    Resource resource = context.resourceResolver().getResource(CONTENT_LINK1);	
    final String expectedLinkText = "Learn More";
	final String expectedLinkUrl = "https://www.etisalat.ae/b2c/quick-pay.html";
	final String expectedAltText = "ContactAltText";
	final String expectedTitle = "Contact Sales";
    final String expectedEnableIcon = "true";
	 
    LinkModel linkModel = resource.adaptTo(LinkModel.class);
    QuickLinkModel item = resource.adaptTo(QuickLinkModel.class);
    List<LinkModel> linkModelList = new ArrayList<>();
    linkModelList.add(linkModel);
    item.setLinks(linkModelList);
    
    LinkModel expectedItem = item.getLinks().get(0);
    assertEquals(expectedLinkText, expectedItem.getLinkText());
    assertEquals(expectedLinkUrl, expectedItem.getLinkUrl());
    assertEquals(expectedAltText, expectedItem.getAltText());
    assertEquals(expectedTitle, expectedItem.getTitle());
    assertEquals(expectedEnableIcon, expectedItem.getEnableIcon());
 }

}
