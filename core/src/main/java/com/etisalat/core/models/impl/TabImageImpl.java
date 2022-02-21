package com.etisalat.core.models.impl;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.models.LinkModel;
import com.etisalat.core.models.TabImage;
import com.etisalat.core.util.CommonUtility;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class},
    adapters = {TabImage.class}, resourceType = {TabImageImpl.RESOURCE_TYPE})
public class TabImageImpl implements TabImage {

  /**
   * The resource type.
   */
  protected static final String RESOURCE_TYPE = "etisalat/components/tabs";

  @SlingObject
  @Optional
  private Resource res;


  @Override
  public List<LinkModel> getTabImageItems() {
    return Collections.unmodifiableList(CommonUtility.getLinkItems(AEConstants.IMAGE_TAB,  res));
  }

}
