package com.etisalat.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith(AemContextExtension.class)
public class BillExplainerModelTest {

  private final AemContext context = new AemContext();
  
  private static final String CONTENT_ROOT = "/content";
  private static final String CURRENT_PAGE = "/content/billexplainer";

  private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container/billexplainertab";
  protected static final String TOTAL_SUMMARY_DATA = TEST_PAGE_CONTAINER_ROOT + "/total-summary";
  protected static final String BILL_HISTORY_DATA = TEST_PAGE_CONTAINER_ROOT + "/bill-history";
  
  
  @BeforeEach
  public void setup() throws Exception {
    context.addModelsForClasses(BillExplainerModel.class);
    context.load().json("/com/etisalat/core/models/BillExplainerModelTest.json", CONTENT_ROOT);
    context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());

  }
  
  @Test
  void testTotalUsageSummary() {
    final String expectedJsonData = "[{\"placement\":\"bottom\",\"title\":\"\\u003cspan\\u003e1.\\u003c/span\\u003e Total usage summary\",\"content\":\"\\u003cp\\u003eYour total consumption throughout the month\\u003c/p\\u003e\",\"element\":\"#Step-1\"},{\"placement\":\"bottom\",\"title\":\"\\u003cspan\\u003e2.\\u003c/span\\u003e Contact information\",\"content\":\"\\u003cp\\u003eYour contact details registered with Etisalat\\u003c/p\\u003e\",\"element\":\"#Step-2\"},{\"placement\":\"bottom\",\"title\":\"\\u003cspan\\u003e3.\\u003c/span\\u003e Account information\",\"content\":\"\\u003cp\\u003eDetails of the selected account\\u003c/p\\u003e\",\"element\":\"#Step-3\"}]";

    Resource resource = context.resourceResolver().getResource(TOTAL_SUMMARY_DATA);
    BillExplainerModel item = resource.adaptTo(BillExplainerModel.class);
    String actualTotalUsageJsonData = item.getStepsData();
    assertEquals(expectedJsonData, actualTotalUsageJsonData);

  }
  
  @Test
  void testBillHistory() {
    final String expectedJsonData = "[{\"placement\":\"bottom\",\"title\":\"\\u003cspan\\u003e1.\\u003c/span\\u003e Bill history\",\"content\":\"\\u003cp\\u003eYour billing trend for the past six months\\u003c/p\\u003e\",\"element\":\"#Step-1\"},{\"placement\":\"bottom\",\"title\":\"\\u003cspan\\u003e2.\\u003c/span\\u003e Contact information\",\"content\":\"\\u003cp\\u003eYour contact details registered with Etisalat\\u003c/p\\u003e\",\"element\":\"#Step-2\"}]";

    Resource resource = context.resourceResolver().getResource(BILL_HISTORY_DATA);
    BillExplainerModel item = resource.adaptTo(BillExplainerModel.class);
    String actualBillHistoryJsonData = item.getStepsData();
    assertEquals(expectedJsonData, actualBillHistoryJsonData);
  }
}
