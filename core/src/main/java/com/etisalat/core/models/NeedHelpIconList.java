package com.etisalat.core.models;

import java.util.List;

public interface NeedHelpIconList {

	/**
	 * @return a collection of objects representing the icon card items that compose the list.
	 */
	List<NeedHelpIconVO> getIconDetailsWithBean();

	int getIconListSize();

	public String getTitle();

	public String getDescription();

	public String getButtonText();

	public String getDisplayBehaviour();

}
