package com.etisalat.core.models.impl;

import com.etisalat.core.constants.AEConstants;
import com.etisalat.core.models.CareerGreetings;
import com.etisalat.core.models.LinkModel;
import javax.annotation.PostConstruct;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * WHAT IS IT ???
 * <p>
 * WHAT PURPOSE THAT IT HAS ???
 * </p>
 *
 * @author mtrivedi
 * @since 2021-08-11
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {
    CareerGreetings.class}, resourceType = {CareerGreetingsImpl.RESOURCE_TYPE})
public class CareerGreetingsImpl implements CareerGreetings {

  private static final Logger LOG = LoggerFactory.getLogger(CareerGreetingsImpl.class);

  protected static final String RESOURCE_TYPE = "etisalat/components/career-greetings";

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String preTitle;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String title;

  @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
  private String description;

  private LinkModel coverImage;

  private LinkModel image;

  @SlingObject
  @Optional
  protected Resource currentResource;

  @PostConstruct
  protected void init() {
    LOG.info("current resource is {}", currentResource.getPath());
    if (currentResource.hasChildren()) {
      final Resource coverNode = currentResource.getChild(AEConstants.COVER_NODE);
      final Resource imageNode = currentResource.getChild(AEConstants.IMAGE_NODE);
      if (null != coverNode) {
        coverImage = coverNode.adaptTo(LinkModel.class);
      }
      LOG.info("Cover child node resource {}", coverNode);

      if (null != imageNode) {
        image = imageNode.adaptTo(LinkModel.class);
      }
      LOG.info("Image child node resource {}", imageNode);
    }
  }

  /**
   * @return a object representing the Cover image item.
   */
  @Override
  public LinkModel getCover() {
    return coverImage;
  }

  /**
   * @return a object representing the image item.
   */
  @Override
  public LinkModel getImage() {
    return image;
  }

  /**
   * @return a object representing the title.
   */
  @Override
  public String getTitle() {
    return title;
  }

  /**
   * @return a object representing the Pre-title.
   */
  @Override
  public String getPreTitle() {
    return preTitle;
  }

  /**
   * @return a object representing the Description.
   */
  @Override
  public String getDescription() {
    return description;
  }
}
