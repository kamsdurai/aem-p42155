package com.etisalat.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.io.*;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@ExtendWith(AemContextExtension.class)
class TableModelTest {
    private final AemContext context = new AemContext();

    String channelsCSVTXT = "channelsCSV.txt";
    String csvPath = "/content/dam/etisalat/csv/channels.csv";
    String filterCSV = "/content/dam/etisalat/csv/filters.csv";
    String channelsFiltersCSVTXT = "channelsFiltersCSV.txt";
    String simplecsvPath = "/content/dam/etisalat/csv/simple-table.csv";
    String SimpleTableCSVTXT = "SimpleTableCSV.txt";


    @BeforeEach
    public void setup() throws Exception {
        context.addModelsForClasses(TableModel.class);
        context.load().json("/com/etisalat/core/models/TableModelTest.json", "/content/etisalat");
        context.currentResource("/content/etisalat/en/jcr:content/root/container/table");
    }

    @Test
    void testGetSorting() {
        TableModel tableModel = context.request().adaptTo(TableModel.class);
        assertEquals("_all", tableModel.getSorting());
    }

    @Test
    void testGetHeaderForChannelsTable() throws FileNotFoundException {
        TableModel tableModel = context.request().adaptTo(TableModel.class);
        createAsset(csvPath, channelsCSVTXT);
        List<String> list = tableModel.getHeaderListForChannelsTable();
        assertFalse(list.isEmpty());
    }

    @Test
    void testGetAllRowsForChannelsTable() throws FileNotFoundException {
        TableModel tableModel = context.request().adaptTo(TableModel.class);
        createAsset(csvPath, channelsCSVTXT);
        List<LinkedHashMap<String, String>> list = tableModel.getAllRowsForChannelsTable();
        assertFalse(list.isEmpty());
    }

    @Test
    void testGetAllRowsSimpleCSV() throws FileNotFoundException {
        TableModel tableModel = context.request().adaptTo(TableModel.class);
        createAsset(simplecsvPath, SimpleTableCSVTXT);
        List<List<String>> list = tableModel.getAllRowsSimpleCSV();
        assertFalse(list.isEmpty());
    }

    @Test
    void testGetFiltersForChannelsTable() throws FileNotFoundException {
        TableModel tableModel = context.request().adaptTo(TableModel.class);
        createAsset(filterCSV, channelsFiltersCSVTXT);
        Map<String, Map<String, String>> map = tableModel.getAllFiltersForChannelsTable();
        assertFalse(map.isEmpty());
    }

    private void createAsset(String assetPath, String txtFilePath) throws FileNotFoundException {
        String basePath = "src/test/resources/com/etisalat/core/models/";
        final File initialFile = new File(basePath + txtFilePath);
        final InputStream targetStream =
                new DataInputStream(new FileInputStream(initialFile));
        context.create().asset(assetPath, targetStream, "text/csv");
    }

}
