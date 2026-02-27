import {
  Table,
  Button,
  message,
  Input,
  Modal,
  Form,
  InputNumber,
  Select,
} from "antd";
import { useState, useEffect } from "react";

import {
  apiGetProductInit,
  apiGetProductList,
  apiSaveProduct,
} from "../api/api";

function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [uoms, setUoms] = useState([]);

  const [form] = Form.useForm();

  const fetchProducts = async () => {
    try {
      const res = await apiGetProductList();
      if (res.data.code !== 0) {
        message.info("Failed to fetch products");
        return;
      }
      setProducts(res.data.products);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchInitData = async () => {
    try {
      const res = await apiGetProductInit();
      if (res.data.code != 0) {
        message.info("Failed to fetch init data");
        return;
      }
      setCategories(res.data.categories);
      setBrands(res.data.brands);
      setUoms(res.data.uoms);
    } catch (error) {
      message.error(error.message);
    }
  };

  // trigger api call
  useEffect(() => {
    fetchProducts();
    fetchInitData();
  }, []);

  // table column
  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      render: (text) => <a className="cursor-wait">{text}</a>,
    },
    {
      title: "Product Code",
      dataIndex: "product_code",
      render: (text) => <a className="">{text || "-"}</a>,
    },
    {
      title: "Stock Quantity",
      dataIndex: "stock",
      render: (__, record) => (
        <span>
          {record.stock} {record.uom_name}
        </span>
      ),
    },
    {
      title: "Cost Price",
      dataIndex: "cost",
      render: (v) => <span>{v} $</span>,
    },
    {
      title: "Retail Price",
      dataIndex: "retail",
      render: (v) => <span>{v} $</span>,
    },
    {
      title: "Whole Price",
      dataIndex: "whole",
      render: (v) => <span>{v} $</span>,
    },
    {
      title: "Action",
      width: 100,
      render: (__, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              form.setFieldsValue({
                productId: record.id || 0,
                productName: record.product_name,
                productCode: record.product_code,
                productBarcode: record.product_barcode,
                costPrice: record.cost,
                retailPrice: record.retail,
                wholePrice: record.whole,
                productQty: record.stock,
                categoryId: record.cat_id,
                brandId: record.b_id,
                uomId: record.u_id,
              });
              setIsModalOpen(true);
            }}
          >
            ✏️
          </Button>
          <Button type="link">🗑️</Button>
        </span>
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.getFieldsValue();
      const payload = {
        ProductId: values.productId || 0,
        ProductName: values.productName,
        ProductCode: values.productCode,
        ProductBarcode: values.productBarcode,
        StockQty: values.productQty,
        Cost: values.costPrice,
        Retail: values.retailPrice,
        Whole: values.wholePrice,
        CategoryId: values.categoryId || null,
        BrandId: values.brandId || null,
        UomId: values.uomId || null,
      };
      const res = await apiSaveProduct(payload);
      if (res.data.code != 0) {
        message.error("Failed to save product");
        return;
      }
      fetchProducts();
      message.success(res.data.message);
      setIsModalOpen(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between px-4 bg-slate-500 py-3 text-white">
        <h1 className="text-xl">Products</h1>
        <Button type="dashed" size="large" onClick={() => setIsModalOpen(true)}>
          Create Product
        </Button>
      </div>

      {/* table product */}
      <div className="px-4 mt-4">
        <Table dataSource={products} columns={columns} bordered={false} />
      </div>

      {/* modal product */}
      <Modal
        title="Product Information"
        open={isModalOpen}
        width={800}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" autoComplete="on">
          <Form.Item hidden name="productId">
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please input your product name!" },
            ]}
          >
            <Input placeholder="Input product name..." />
          </Form.Item>
          <Form.Item hasFeedback label="Code" name="productCode">
            <Input placeholder="Input product code..." />
          </Form.Item>
          <Form.Item hasFeedback label="Barcode" name="productBarcode">
            <Input placeholder="Input product barcode..." />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item
              label="Stock Quantity"
              name="productQty"
              rules={[
                {
                  required: true,
                  message: "Please input your product stock quantity!",
                },
              ]}
            >
              <InputNumber min={0} style={{ minWidth: 100 }} />
            </Form.Item>
            <Form.Item label="Cost Price" name="costPrice">
              <InputNumber min={0} style={{ minWidth: 200 }} />
            </Form.Item>
            <Form.Item label="Retail Price" name="retailPrice">
              <InputNumber min={0} style={{ minWidth: 200 }} />
            </Form.Item>
            <Form.Item label="Whole Price" name="wholePrice">
              <InputNumber min={0} style={{ minWidth: 200 }} />
            </Form.Item>
          </div>
          <Form.Item label="Choose Category" name="categoryId">
            <Select
              placeholder="Choose Category"
              options={categories.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
            />
          </Form.Item>
          <Form.Item label="Unit of Measure" name="uomId">
            <Select
              showSearch={{ optionFilterProp: "lable" }}
              placeholder="Choose Uom"
              options={uoms.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
            />
          </Form.Item>
          <Form.Item label="Brand" name="brandId">
            <Select
              showSearch={{ optionFilterProp: "lable" }}
              placeholder="Choose Brand"
              options={brands.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
            />
          </Form.Item>

          {/* design button for submit */}
          <div className="flex justify-end">
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
export default ProductPage;
