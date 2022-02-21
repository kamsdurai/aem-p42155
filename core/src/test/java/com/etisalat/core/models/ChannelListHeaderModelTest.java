package com.etisalat.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class ChannelListHeaderModelTest {
    private final AemContext context = new AemContext();

    @BeforeEach
    public void setup() throws Exception {

        context.addModelsForClasses(ChannelListHeaderModel.class);
        context.load().json("/com/etisalat/core/models/ChannelListHeaderModelTest.json", "/content/etisalat");
        context.currentResource("/content/etisalat/en/jcr:content/root/container/channellistheader");
    }

    @Test
    void testGetLogoLink() {
        ChannelListHeaderModel model = context.request().adaptTo(ChannelListHeaderModel.class);
        assertEquals("/content/etisalat/en.html", model.getLogoLink());
    }

    @Test
    void testGetLink() {
        ChannelListHeaderModel model = context.request().adaptTo(ChannelListHeaderModel.class);
        assertEquals("/content/etisalat/en.html", model.getLink());
    }
}