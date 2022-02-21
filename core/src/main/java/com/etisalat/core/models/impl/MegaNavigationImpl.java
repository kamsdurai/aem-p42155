package com.etisalat.core.models.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.etisalat.core.constants.AEConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.factory.ModelFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import com.etisalat.core.constants.PageConstants;
import com.etisalat.core.models.FixedNavigtaionMultifieldModel;
import com.etisalat.core.models.LinkModel;
import com.etisalat.core.models.MegaFixedNavigationItem;
import com.etisalat.core.models.MegaNavigation;
import com.etisalat.core.models.MegaNavigationItem;
import com.etisalat.core.models.MegaSubNavigationItem;
import com.etisalat.core.models.MegaTeaserModel;
import com.etisalat.core.models.TopnavModel;
import com.etisalat.core.util.CommonUtility;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {
        MegaNavigation.class}, resourceType = {MegaNavigationImpl.RESOURCE_TYPE})
public class MegaNavigationImpl implements MegaNavigation {

    private static final Logger LOG = LoggerFactory.getLogger(MegaNavigationImpl.class);

    /**
     * The resource type.
     */
    protected static final String RESOURCE_TYPE = "etisalat/components/global/meganavigation";

    @SlingObject
    @Optional
    private Resource currentRes;

    @Self
    @Optional
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String fileReference;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String logoLink;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String menuLayout;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String topNavMenuPath;

    private Resource topNavResource;

    /**
     * The model factory service.
     */
    @OSGiService
    private ModelFactory modelFactory;


    /**
     * Returns the  experience fragment menu items list.
     *
     * @param childItem
     * @return
     */
    private List<MegaNavigationItem> getXFContainerMenuListItems(String childItem) {
        final List<MegaNavigationItem> containerXFMenuList = new ArrayList<>();
        if (StringUtils.isNotBlank(menuLayout) && ("xfragment").equals(menuLayout)) {
            final Resource navItemRes = currentRes.getChild(childItem);
            if (null != navItemRes) {
                navItemRes.listChildren().forEachRemaining(resource -> {
                    final MegaNavigationItem navModel = resource.adaptTo(MegaNavigationItem.class);
                    final String variationPath = navModel.getXfVariationPath();
                    setXFContainerMenuListItems(resource, variationPath, navModel);
                    containerXFMenuList.add(navModel);
                });
            }

        }
        return containerXFMenuList;
    }


    /**
     * Returns the MegaNavigation menu items list.
     *
     * @param childItem
     * @return
     */
    private List<MegaNavigationItem> getNavigationItems(String childItem) {
        final Resource navItemRes = currentRes.getChild(childItem);
        final List<MegaNavigationItem> navigationItemsList = new ArrayList<>();
        if (null != navItemRes) {
            navItemRes.listChildren().forEachRemaining(resource -> {
                final MegaNavigationItem navModel = resource.adaptTo(MegaNavigationItem.class);
                navModel.setNavigationLinkTo(CommonUtility
                        .appendHtmlExtensionToPage(resourceResolver, navModel.getNavigationLinkTo()));
                if (StringUtils.isBlank(navModel.getUtilityMenuLayout())
                        || ("fixedmenulist").equals(navModel.getUtilityMenuLayout())) {
                    setSubNavigationItems(resource, navModel);
                } else {
                    final String variationPath = navModel.getXfVariationPath();
                    setXFContainerMenuListItems(resource, variationPath, navModel);
                }
                navigationItemsList.add(navModel);
            });
        }

        return navigationItemsList;

    }

    /**
     * Sets the MegaNavigation Sub menu items list.
     *
     * @param itemResource
     * @param navModel
     */
    private void setSubNavigationItems(Resource itemResource, MegaNavigationItem navModel) {
        if (itemResource.hasChildren()) {
            final Resource subItemRes = itemResource.getChild(AEConstants.SUB_NAVIGATION_ITEMS);
            final List<MegaSubNavigationItem> subItemList = new ArrayList<>();
            subItemRes.listChildren().forEachRemaining(resource -> {
                final MegaSubNavigationItem subNavModel = resource.adaptTo(MegaSubNavigationItem.class);
                setNavMenuActive(resource, subNavModel.getSubNavLinkTo(), navModel);
                subNavModel.setSubNavLinkTo(CommonUtility
                        .appendHtmlExtensionToPage(resourceResolver, subNavModel.getSubNavLinkTo()));
                subItemList.add(subNavModel);
            });
            navModel.setSubNavigationList(subItemList);
        }
    }

    /**
     * Sets menu active item if current page name equals to sub navigation link else empty.
     *
     * @param resource
     * @param path
     * @param nav
     */
    private void setNavMenuActive(Resource resource, String path, MegaNavigationItem nav) {
        if (StringUtils.isNotEmpty(path) && !path.contains(PageConstants.HTTPS)
                && (path.startsWith(PageConstants.CONTENT)
                && !StringUtils.contains(path, PageConstants.HTML_EXTENSION))) {
            final Resource subNavResource = resource.getResourceResolver().getResource(path);
            if (null != subNavResource && StringUtils.isBlank(nav.getActive()) && request.getPathInfo()
                    .contains(subNavResource.getName())) {
                nav.setActive(AEConstants.ACTIVE);
            }
        }
    }


    /**
     * Sets experience fragment container menu items list.
     *
     * @param resource
     * @param variationPath
     * @param navModel
     */
    private void setXFContainerMenuListItems(Resource resource, String variationPath,
                                             MegaNavigationItem navModel) {
        if (StringUtils.isNotBlank(variationPath)
                && null != resource.getResourceResolver().getResource(variationPath)) {
            final Resource variationRes = resource.getResourceResolver().getResource(variationPath);
            final Resource rootRes = variationRes.getChild(AEConstants.JCR_CONTENT_ROOT);
            setMenuItems(rootRes, navModel);
        } else {
            LOG.warn("Invalid experience fragment variation path");
        }
    }

    /**
     * Sets MegaMenu Experience fragment container components
     *
     * @param rootRes
     * @param navModel
     */
    private void setMenuItems(Resource rootRes, MegaNavigationItem navModel) {
        if (null != rootRes) {
            rootRes.listChildren().forEachRemaining(resource -> {
                final String styleID = getContainerStyleID(resource);
                LOG.info("Mega Menu Style ID {}", styleID);
                switch (styleID) {
                    case "1626427188774": {
                        navModel.setContainerSubMenuList(getMegaSubMenuList(resource, PageConstants.FIXED_NAVIGATION_RESOURCE_TYPE));
                        LOG.info("Mega menu container sub menu list {}",navModel.getContainerSubMenuList());
                        break;
                    }
                    case "1626427211199": {
                        navModel
                                .setContainerFooterMenuList(getMegaSubMenuList(resource, PageConstants.FIXED_NAVIGATION_RESOURCE_TYPE));
                        LOG.info("Mega menu container footer menu list {}",navModel.getContainerFooterMenuList());
                        break;
                    }
                    case "1626428057855": {
                        navModel.setContainerPromotionList(getMegaPromotionalTilesList(resource, PageConstants.TEASER_RESOURCE_TYPE));
                        LOG.info("Mega menu container promotion list {}",navModel.getContainerFooterMenuList());
                        break;
                    }
                    default:
                        LOG.error("Style ID is empty or didn't match the mega meu style id {}", styleID);
                }

            });
        }
    }

    /**
     * Gets Container sub menu and footer menu items to list.
     * @param item
     * @param resourceType
     */
    private List<MegaFixedNavigationItem> getMegaSubMenuList(Resource item, String resourceType) {
        final List<MegaFixedNavigationItem> subMenuList = new ArrayList<>();
        for (Resource childRes : item.getChildren()) {
            final String styleID = getContainerStyleID(childRes);
            if (childRes.getResourceType().equals(resourceType)) {
                final MegaFixedNavigationItem fixedNavModel = childRes.adaptTo(MegaFixedNavigationItem.class);
                if (null != fixedNavModel) {
                    subMenuList.add(fixedNavModel);
                }
            } else if (("etisalat/components/container").equals(childRes.getResourceType()) && StringUtils.isNotBlank(styleID)
                    && ("1628780873955").equals(styleID)) {
                MegaFixedNavigationItem fixedNavModel = childRes.adaptTo(MegaFixedNavigationItem.class);
                fixedNavModel.setFeatureItemExist(true);
                setContainerBrandMenuList(childRes, fixedNavModel, subMenuList);
            }
        }

        return subMenuList;
    }

    /**
     * Sets Mega menu brand item list.
     *
     * @param itemResource
     * @param fixedNavModel
     * @param subMenuList
     */
    private void setContainerBrandMenuList(Resource itemResource,
                                           MegaFixedNavigationItem fixedNavModel, List<MegaFixedNavigationItem> subMenuList) {
        final List<MegaTeaserModel> brandMenuList = new ArrayList<>();
        for (Resource childRes : itemResource.getChildren()) {
            if (childRes.getResourceType().equals(PageConstants.TITLE_RESOURCE_TYPE)) {
                fixedNavModel
                        .setTitle(childRes.getValueMap().get(JcrConstants.JCR_TITLE, StringUtils.EMPTY));
            } else if (childRes.getResourceType().equals(PageConstants.TEASER_RESOURCE_TYPE)) {
                final MegaTeaserModel teaserModel = childRes.adaptTo(MegaTeaserModel.class);
                if (null != teaserModel && StringUtils.isNotBlank(teaserModel.getFileReference())) {
                    brandMenuList.add(teaserModel);
                }
            }
        }
        fixedNavModel.setFeatureImageList(brandMenuList);
        LOG.info("Mega menu container brand menu list {}",fixedNavModel.getFeatureImageList());
        subMenuList.add(fixedNavModel);
    }

    /**
     * Gets container promotional and cover tiles items to list.
     * @param childResource
     * @param resourceType
     * @return
     */
    private List<MegaTeaserModel> getMegaPromotionalTilesList(Resource childResource,
                                                              String resourceType) {
        final List<MegaTeaserModel> tilesList = new ArrayList<>();
        childResource.listChildren().forEachRemaining(resource -> {
            if (!resource.getName().equals(AEConstants.CQ_RESPONSIVE_NODE) && resource.getResourceType()
                    .equals(resourceType)) {
                final MegaTeaserModel teaserModel = resource.adaptTo(MegaTeaserModel.class);
                if (null != teaserModel && StringUtils.isNotBlank(teaserModel.getFileReference())) {
                    setTeaserCTADetails(teaserModel, resource);
                    tilesList.add(teaserModel);
                }
            }
        });
        LOG.info("Mega menu promotional tiles list {}",tilesList);
        return tilesList;
    }

    /**
     * Sets teaser cta link and text details.
     *
     * @param teaserModel
     * @param actionResource
     */
    private void setTeaserCTADetails(MegaTeaserModel teaserModel, Resource actionResource) {
        if (StringUtils.isNotBlank(teaserModel.getActionsEnabled()) && ("true")
                .equals(teaserModel.getActionsEnabled())) {
            final  Resource item = actionResource.getChild("actions");
            if (null != item) {
                for (Resource itemRes : item.getChildren()) {
                    final ValueMap vm = itemRes.getValueMap();
                    teaserModel.setLink(CommonUtility.appendHtmlExtensionToPage(resourceResolver,
                            vm.get(AEConstants.PROPERTY_LINK, StringUtils.EMPTY)));
                    teaserModel.setText(vm.get("text", String.class));
                }

            }
        }
    }

    /**
     * This method returns the container style id.
     *
     * @param resource
     * @return
     */
    private String getContainerStyleID(Resource resource) {
        if (resource.getValueMap().containsKey(AEConstants.STYLE_ID)) {
            final String[] styleIds = resource.getValueMap().get(AEConstants.STYLE_ID, String[].class);
            if (null != styleIds && styleIds.length > 0) {
                return styleIds[0];
            }
        }
        return StringUtils.EMPTY;
    }

    /**
     * Return a collection of objects representing the top navigation menu items.
     *
     * @param childItem
     * @return
     */
    private List<FixedNavigtaionMultifieldModel> getTopNavigationItems(String childItem) {
        final List<FixedNavigtaionMultifieldModel> topNavItemsList = new ArrayList<>();
        Resource rootRes = null;
        if (StringUtils.isNotBlank(topNavMenuPath) && currentRes.getPath().contains(topNavMenuPath)) {
            rootRes = currentRes.getParent();
        } else if (StringUtils.isNotBlank(topNavMenuPath)) {
            final Resource topNavRes = currentRes.getResourceResolver().getResource(topNavMenuPath);
            if (null != topNavRes) {
                rootRes = topNavRes.getChild(AEConstants.JCR_CONTENT_ROOT);
            }
        }

        setTopNavigationMenuItems(topNavItemsList, rootRes, childItem);
        LOG.info("Mega menu top navigation item list {}",topNavItemsList);
        return topNavItemsList;
    }

    /**
     * Sets top navigation menu item details.
     *
     * @param topNavItemsList
     * @param rootRes
     * @param childItem
     */
    private void setTopNavigationMenuItems(List<FixedNavigtaionMultifieldModel> topNavItemsList,
                                           Resource rootRes,
                                           String childItem) {
        if (null != rootRes) {
            for (Resource childRes : rootRes.getChildren()) {
                final String resourceType = childRes.getResourceType();
                if (resourceType.equals(PageConstants.TOP_NAVIGATION_RESOURCE_TYPE) && null != childRes
                        .getChild(childItem)) {
                    childRes.getChild(childItem).listChildren().forEachRemaining(resource -> {
                        final FixedNavigtaionMultifieldModel navModel = resource
                                .adaptTo(FixedNavigtaionMultifieldModel.class);
                        navModel.setTopNavigationXFResource(resource);
                        navModel.setNavigationLink(
                                CommonUtility
                                        .appendHtmlExtensionToPage(resourceResolver, navModel.getNavigationLink()));
                        topNavItemsList.add(navModel);
                    });
                    setTopNavResource(childRes);
                    break;
                }
            }
        }
    }

    @Override
    public List<MegaNavigationItem> getMegaNavigationItems() {
        return Collections.unmodifiableList(getNavigationItems(AEConstants.NAVIGATION_ITEMS));
    }

    @Override
    public String getImagePath() {
        return fileReference;
    }

    @Override
    public List<MegaNavigationItem> getUtilityNavItems() {
        return Collections.unmodifiableList(getNavigationItems(AEConstants.ADDITIONAL_LINKS));
    }

    @Override
    public String getLogoMenuLink() {
        return CommonUtility.appendHtmlExtensionToPage(resourceResolver, logoLink);
    }


    @Override
    public List<MegaNavigationItem> getMegaContainerItems() {
        return Collections.unmodifiableList(getXFContainerMenuListItems(AEConstants.CONTAINER_ITEMS));
    }


    @Override
    public List<MegaNavigationItem> getAccountNavigationItems() {
        return Collections.unmodifiableList(getNavigationItems(AEConstants.MYACCOUNT_LINKS));
    }


    @Override
    public List<FixedNavigtaionMultifieldModel> getTopNavMenuItems() {
        return Collections.unmodifiableList(getTopNavigationItems(AEConstants.TOP_NAVIGATION_LINKS));
    }


    @Override
    public List<FixedNavigtaionMultifieldModel> getTopNavIconMenuItems() {
        return Collections.unmodifiableList(getTopNavigationItems(AEConstants.LINKS_WITH_ICONS));
    }

    @Override
    public List<LinkModel> getLanguageItems() {
        List<LinkModel> langList = new ArrayList<>();
        if (null != getTopNavResource()) {
            final TopnavModel topNavModel = this.modelFactory
                    .getModelFromWrappedRequest(this.request, getTopNavResource(),
                            TopnavModel.class);
            if (null != topNavModel) {
                langList = topNavModel.getLocaleList();
            }
        }
        return Collections.unmodifiableList(langList);
    }


    /**
     * @return the topNavResource
     */
    public Resource getTopNavResource() {
        return topNavResource;
    }


    /**
     * @param topNavResource the topNavResource to set
     */
    public void setTopNavResource(Resource topNavResource) {
        this.topNavResource = topNavResource;
    }

}
