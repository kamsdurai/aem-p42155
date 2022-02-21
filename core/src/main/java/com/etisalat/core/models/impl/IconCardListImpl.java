package com.etisalat.core.models.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.util.CommonUtility;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.etisalat.core.models.IconCardList;
import com.etisalat.core.models.IconCardVO;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {
    IconCardList.class}, resourceType = {IconCardListImpl.RESOURCE_TYPE})
public class IconCardListImpl implements IconCardList {

  private static final Logger LOG = LoggerFactory.getLogger(IconCardListImpl.class);
  
  public static final String RESOURCE_TYPE = "etisalat/components/iconcardlist";

  @SlingObject
  @Optional
  private Resource res;

  @SlingObject
  ResourceResolver resourceResolver;

  @Override
  public List<IconCardVO> getIconCardListItems() {
    final Resource iconCardList = res.getChild(AEConstants.NAV_ITEMS);
	final List<IconCardVO> iconCardListItem = new ArrayList<>();
    if (iconCardList != null && iconCardList.hasChildren()) {
      final Iterator<Resource> list = iconCardList.listChildren();
      while (list.hasNext()) {
        final Resource childResource = list.next();
        final IconCardVO cardList = new IconCardVO();
        cardList.setCardIcon(childResource.getValueMap().get(AEConstants.CARD_ICON, StringUtils.EMPTY));
        cardList.setCardTitle(childResource.getValueMap().get(AEConstants.CARD_TITLE, StringUtils.EMPTY));
        cardList.setLinkBehavior(childResource.getValueMap().get(AEConstants.LINK_BEHAVIOR, StringUtils.EMPTY));
        cardList.setCardLink(CommonUtility.appendHtmlExtensionToPage(resourceResolver,
						childResource.getValueMap().get(AEConstants.CARD_LINK, String.class)));
        iconCardListItem.add(cardList);
      }

    } else {
    	LOG.error("Icon Card list is empty {}",res.getPath());
    }
    return Collections.unmodifiableList(iconCardListItem);
  }

  @Override
  public int getIconCardSize() {
    final int defaultSize = 0;
    if (getIconCardListItems() != null) {
      return getIconCardListItems().size();
    }
    return defaultSize;
  }

}
