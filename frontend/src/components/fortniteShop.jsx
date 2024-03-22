import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@nextui-org/react";
import { useCartContext } from "../context/cartContext";

const ForniteShop = () => {
  const [items, setItems] = useState([]);
  const { t, i18n } = useTranslation();
  const { addProduct } = useCartContext();

  useEffect(() => {
    fetch("https://fortniteapi.io/v2/shop?lang=en", {
      headers: { Authorization: import.meta.env.VITE_REACT_APP_SHOPAPIKEY },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.shop);
        setItems(data.shop);
      });
  }, []);

  const handleAddCart = (item) => {
    addProduct(item, 1);
  };

  return (
    <div className="flex justify-between flex-wrap max-sm:justify-around xl:mt-5 max-sm:mt-10">
      {items.map((item, index) => {
        const {
          mainId,
          displayName,
          displayDescription,
          displayAssets: [{ background, url } = {}],
          price: { regularPrice, finalPrice },
          buy,
        } = item;
        const backgroundUrl = background ? background : url;
        return backgroundUrl ? (
          <div key={index} className="w-52">
            <div className="card relative w-52 mt-2 hover:scale-[1.02] shadow hover:cursor-pointer hover:border-2">
              <div className="card-image">
                <img src={backgroundUrl} alt={displayName} />
              </div>
              <div className="absolute bg-black/[.40] w-full h-14 bottom-0 flex flex-col justify-center items-center">
                <p className="text-white fortnite truncate w-11/12">
                  {displayName}
                </p>
                <p className="text-white inter900 w-11/12">
                  {i18n.language === "en"
                    ? `$${(finalPrice * 0.0023).toFixed(2)} USD`
                    : `$${(finalPrice * 0.91).toFixed()} ARS`}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <Button
                color="primary"
                onClick={() => {
                  const item = {
                    id: mainId,
                    quantity: 1,
                    name: displayName,
                    type: "shop",
                    img: background,
                    priceUSD: (finalPrice * 0.0023).toFixed(2),
                    priceARS: (finalPrice * 0.91).toFixed(),
                    method: "gift",
                  };
                  handleAddCart(item);
                }}
                className="w-full rounded-sm inter400"
                variant="ghost"
              >
                {t("addcart")}
              </Button>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};
export default ForniteShop;
