package com.loudis.colonielheightsshop.enumeration;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public enum Size {
    SMALL("Small"),
    MEDIUM("Medium"),
    LARGE("Large"),
    Extra_Large("X-Large"),
    Extra2_Large("XX-Large"),
    One_Size("One Size");
    private final String indicator;
    Size(String indicator) {
        this.indicator = indicator;
    }

    static final Map<String,Size> lookup = Arrays.asList(values()).stream()
            .collect(Collectors.toMap(
                    // Key is the indicator.
                    s -> s.indicator,
                    // Value is the size.
                    s-> s));

    public static Size lookup(String s) {
        return lookup.get(s.toUpperCase());
    }
}
