import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

interface PaginationFooterProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export const PaginationFooter = memo(
  ({ totalPages, currentPage, handlePageChange }: PaginationFooterProps) => {
    return (
      <View style={styles.paginationContainer}>
        {totalPages > 1
          ? Array.from({ length: totalPages }, (_, index) => index).map(
              (page) => {
                return (
                  <TouchableOpacity
                    key={page}
                    style={[
                      styles.paginationButton,
                      page === currentPage && styles.selectedPage,
                    ]}
                    onPress={() => handlePageChange(page)}
                  >
                    <Text
                      style={[
                        styles.paginationButtonText,
                        page === currentPage && styles.selectedButtonText,
                      ]}
                    >
                      {page + 1}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )
          : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  paginationButton: {
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#016531",
  },
  selectedPage: {
    backgroundColor: "#016531",
  },
  paginationButtonText: {
    color: "#016531",
  },
  selectedButtonText: {
    color: "#FFFFFF",
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
});
