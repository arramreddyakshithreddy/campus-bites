package com.campusbites.model;

public record MenuItem(
        Long id,
        String name,
        String description,
        String category,
        double price,
        String image,
        String tag,
        boolean vegetarian
) {}
