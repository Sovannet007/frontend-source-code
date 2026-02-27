import { useEffect, useState } from "react";
import { apiGetListMasterData } from "../api/api";
import { Button, message, Table } from "antd";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);

  const loadData = async () => {
    const res = await apiGetListMasterData({ MapKey: "brand" });
    if (res.data.code !== 0) {
      message.error(res.data.message);
      return;
    }
    setBrands(res.data.master);
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "brandName",
      key: "name",
    },
    {
      title: "Statistic Product",
      dataIndex: "totalProduct",
      key: "totalProduct",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link">✏️</Button>
          <Button type="link">🗑️</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between px-4 bg-slate-500 py-3 text-white">
        <h1 className="text-xl">Brands</h1>
        <Button type="dashed" size="large">
          Create Brand
        </Button>
      </div>
      <Table columns={columns} dataSource={brands} />
    </>
  );
};

export default BrandPage;
