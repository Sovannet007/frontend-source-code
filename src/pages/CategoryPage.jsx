import { useEffect, useState } from "react";
import { apiGetListMasterData } from "../api/api";
import { Button, message, Table } from "antd";
import MasterSaveModal from "../modal/MasterSaveModal";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState({
    id: 0,
    name: "",
    remark: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const loadData = async () => {
    const res = await apiGetListMasterData({ MapKey: "category" });
    if (res.data.code !== 0) {
      message.error(res.data.message);
      return;
    }
    setCategories(res.data.master);
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
      dataIndex: "categoryName",
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
              setCategoryDetail({
                id: record.id,
                name: record.categoryName,
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
        <h1 className="text-xl">Categories</h1>
        <Button type="dashed" size="large" onClick={() => setOpenModal(true)}>
          Create Category
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} />

      {/* category modal */}
      <MasterSaveModal
        openModal={openModal}
        mapKey="category"
        titleModal="Category Information"
        onCancel={() => setOpenModal(false)}
        onSave={() => {
          setOpenModal(false);
          loadData();
        }}
        oldData={categoryDetail}
      />
    </>
  );
};

export default CategoryPage;
