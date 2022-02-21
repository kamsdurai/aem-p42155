package com.etisalat.core.models;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.util.CommonUtility;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


@Model(adaptables = {Resource.class, SlingHttpServletRequest.class})
public class HeroLinkSection {

    @SlingObject
    @Optional
    private Resource resource;

    @SlingObject
    ResourceResolver resourceResolver;

    public List<HeroLinkSectionVO> getHeroLinkSectionList() {
        final List<HeroLinkSectionVO> linkSectionPojoList = new ArrayList<>();
        final Resource heroLinksSection = resource.getChild(AEConstants.HERO_LINKS_SECTION);
        final Iterator<Resource> iterator = heroLinksSection.listChildren();
        while (iterator.hasNext()) {
            final Resource item = iterator.next();
            final HeroLinkSectionVO heroLinkSectionVO = new HeroLinkSectionVO();
            heroLinkSectionVO.setIconImage(item.getValueMap().get(AEConstants.ICON_IMAGE, String.class));
            heroLinkSectionVO.setIconText(item.getValueMap().get(AEConstants.ICON_TEXT, String.class));
            heroLinkSectionVO.setLinkTarget(item.getValueMap().get(AEConstants.LINK_TARGET, String.class));
            heroLinkSectionVO.setIconLink(CommonUtility.appendHtmlExtensionToPage(resourceResolver, item.getValueMap().get(AEConstants.ICON_LINK, String.class)));
            linkSectionPojoList.add(heroLinkSectionVO);
        }
        return linkSectionPojoList;
    }

}
