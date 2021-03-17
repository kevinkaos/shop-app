import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import ProductList from "./ProductList";
import data from "../../assets/data/products.json";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
            placeholder="Search"
          />
          {focus === true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus === true ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <View>
          <View>
            <Banner />
          </View>
          <View style={{ marginTop: 100 }}>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <ProductList key={item.id} item={item} />
              )}
              keyExtractor={(item) => item.name}
              numColumns={2}
            />
          </View>
        </View>
      )}
    </Container>
  );
};

export default ProductContainer;
