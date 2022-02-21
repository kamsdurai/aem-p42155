package com.etisalat.core.models.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.etisalat.core.models.NeedHelpIconList;
import com.etisalat.core.models.NeedHelpIconVO;

@Model(
		adaptables = SlingHttpServletRequest.class,
		adapters = NeedHelpIconList.class,
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
		)

public class NeedHelpIconListImpl implements NeedHelpIconList  {

	private static final Logger LOG = LoggerFactory.getLogger(NeedHelpIconListImpl.class);

	@SlingObject
	Resource resource;

	@SlingObject
	ResourceResolver resourceResolver;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String description;

	@ValueMapValue
	private String buttonText;

	@ValueMapValue
	private String displayBehaviour;

	@Override
	public List<NeedHelpIconVO> getIconDetailsWithBean() {
		List<NeedHelpIconVO> iconDetailsBean = new ArrayList<>();
		if(null != resource) {
			LOG.info("\n getIconDetailsWithBean path {} ", resource.getPath());

			try {

				if(StringUtils.isNotBlank(resource.getValueMap().get("title", String.class))) {
					this.title = resource.getValueMap().get("title", String.class);
				}

				if(StringUtils.isNotBlank(resource.getValueMap().get("description", String.class))) {
					this.description = resource.getValueMap().get("description", String.class);
				}

				if(StringUtils.isNotBlank(resource.getValueMap().get("buttonText", String.class))) {
					this.buttonText = resource.getValueMap().get("buttonText", String.class);
				}
				if(StringUtils.isNotBlank(resource.getValueMap().get("displayBehaviour", String.class))) {
					this.displayBehaviour = resource.getValueMap().get("displayBehaviour", String.class);
				}

				Resource iconDetailBean = resource.getChild("iconList");
				if(null != iconDetailBean &&  iconDetailBean.hasChildren()){
					for (Resource bookBean : iconDetailBean.getChildren()) {
						LOG.info("\n PATH Bean {} ",bookBean.getPath());
						LOG.info("\n BEAN PRO {} ",bookBean.getValueMap().get("cardTitle",String.class));
						iconDetailsBean.add(new NeedHelpIconVO(bookBean, resourceResolver));
					}
				} else {
					LOG.info("\n getIconDetailsWithBean  path is not have child {}",resource.getPath());
				}
			}catch (Exception e){
				LOG.info("\n ERROR while getting Icon Details With Bean {} ",e.getMessage());
			}

		} else {
			LOG.info("\n getIconDetailsWithBean path is null");
			LOG.debug("\n getIconDetailsWithBean resource is null");
		}
		return iconDetailsBean;
	}

	@Override
	public int getIconListSize() {
		final int defaultSize = 0;
		if (getIconDetailsWithBean() != null) {
			return getIconDetailsWithBean().size();
		}
		return defaultSize;
	}

	@Override
	public String getTitle() {
		return title;
	}

	@Override
	public String getDescription() {
		return description;
	}

	@Override
	public String getButtonText() {
		return buttonText;
	}

	@Override
	public String getDisplayBehaviour() {
		return displayBehaviour;
	}
}
