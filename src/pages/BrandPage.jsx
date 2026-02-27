import { useEffect, useState } from "react";
import { apiGetListMasterData } from "../api/api";
import { Button, message, Table } from "antd";
import MasterSaveModal from "../modal/MasterSaveModal";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [brandDetail, setBrandDetail] = useState({
    id: 0,
    name: "",
    remark: "",
  });
  const [openModal, setOpenModal] = useState(false);

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
          <Button
            type="link"
            onClick={() => {
              setOpenModal(true);
              setBrandDetail({
                id: record.id,
                name: record.brandName,
                remark: record.remark,
              });
            }}
          >
            ✏️
          </Button>
          <Button type="link">🗑️</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between px-4 bg-slate-500 py-3 text-white">
        <h1 className="text-xl">Brands</h1>
        <Button type="dashed" size="large" onClick={() => setOpenModal(true)}>
          Create Brand
        </Button>
      </div>
      <Table columns={columns} dataSource={brands} />

      {/* brand modal */}
      <MasterSaveModal
        openModal={openModal}
        titleModal="Brand Information"
        onCancel={() => setOpenModal(false)}
        onSave={() => {
          setOpenModal(false);
          loadData();
        }}
        oldData={brandDetail}
        mapKey="brand"
      />
    </>
  );
};

export default BrandPage;
