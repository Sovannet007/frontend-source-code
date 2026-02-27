import { useEffect, useState } from "react";
import { apiGetListMasterData } from "../api/api";
import { Button, message, Table } from "antd";
import MasterSaveModal from "../modal/MasterSaveModal";

const UomPage = () => {
  const [uoms, setUoms] = useState([]);
  const [uomDetail, setUomDetail] = useState({
    id: 0,
    name: "",
    remark: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const loadData = async () => {
    const res = await apiGetListMasterData({ MapKey: "uom" });
    if (res.data.code !== 0) {
      message.error(res.data.message);
      return;
    }
    setUoms(res.data.master);
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
      dataIndex: "uomName",
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
              setUomDetail({
                id: record.id,
                name: record.uomName,
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
        <h1 className="text-xl">Unit of Measure</h1>
        <Button type="dashed" size="large" onClick={() => setOpenModal(true)}>
          Create Uoms
        </Button>
      </div>
      <Table columns={columns} dataSource={uoms} />

      {/* category modal */}
      <MasterSaveModal
        openModal={openModal}
        mapKey="uom"
        titleModal="Unit of Measure Information"
        onCancel={() => setOpenModal(false)}
        onSave={() => {
          setOpenModal(false);
          loadData();
        }}
        oldData={uomDetail}
      />
    </>
  );
};

export default UomPage;
