import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ProductPage } from "./ProductPage";
import store from "../../app/store/store";

describe("ProductPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("filtra los productos por categoría", () => {
    render(
      <Provider store={store}>
        <ProductPage />
      </Provider>,
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Cargando productos...",
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(
      screen.getByRole("heading", {
        name: "Cuenta de Ahorro Digital",
      }),
    ).toBeInTheDocument();

    const categorySelect = screen.getByRole("combobox", {
      name: "Filtrar por",
    });

    fireEvent.change(categorySelect, {
      target: { value: "Crédito" },
    });

    expect(
      screen.getByRole("heading", {
        name: "Crédito Personal",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Cuenta de Ahorro Digital",
      }),
    ).not.toBeInTheDocument();
  });
});
