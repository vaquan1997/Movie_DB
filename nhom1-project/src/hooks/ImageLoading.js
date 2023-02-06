
import React, { useState, useEffect } from "react";

const ImageLoading = () => {
    const [isImageLoading, setImageLoading] = useState(true);
    const [movieItem, setMovieItem] = useState();

    const ImageLoad = (item) => {
        setMovieItem(item);
    };

    useEffect(() => {
        if (movieItem != null) {
            var image = movieItem;
            var bigImage = document.createElement("img");
            bigImage.onload = function() {
                image = this.src;
                setImageLoading(false);
            };
            setTimeout(() => {
                bigImage.src = image;
            }, 50);
        }

        return () => {
            setImageLoading(true);
        };
    }, [movieItem]);

    return { ImageLoad, isImageLoading };
};

export default ImageLoading;