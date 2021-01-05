import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, message, Row, Select, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import API from '../../API/API';
import ContentInnerHeader from '../misc/ContentInnerHeader';
import AddNewFrequentNumber from '../user/AddNewFrequentNumber';
import EditFrequentNumber from './EditFrequentNumber';

const { Option } = Select;

const FrequentNumbers = ({
  userInfo,
  frequentNumberForm,
  frequentNumbersTableData,
  getFrequentNumberContent,
  setDataToEdit,
  dataToEdit,
}) => {
  const [tablePageSize, setTablePageSize] = useState({ pageSize: 10 });
  const [visibleNewFrequentNumber, setVisibleNewFrequentNumber] = useState(
    false
  );
  const [loadingTable, setLoadingTable] = useState(false);

  const hoverAnimation = {
    scale: 1.02,
    cursor: 'pointer',
    color: 'red',
    transition: { duration: 0.5 },
  };

  const onChangeTablePageSize = (value) => {
    setTablePageSize({ pageSize: value });
  };

  function handleVisible(info) {
    setDataToEdit(info);
  }

  const deleteFrequentNumber = async (frequentNumberId) => {
    setLoadingTable(true);
    const api = new API(userInfo.token);
    const resDeleteFrequentNumber = await api.DELETE(
      '/UserFrequentContacts/' + frequentNumberId
    );
    message.success('Frequent Number Deleted Successfully!');
    getFrequentNumberContent();
    setDataToEdit(undefined);
  };

  useEffect(() => {
    setLoadingTable(false);
  }, [frequentNumbersTableData]);

  const columns = [
    {
      title: 'Alias',
      dataIndex: 'alias',
      fixed: 'left',
      onFilter: (value, record) => record.alias.indexOf(value) === 0,
      sorter: (a, b) => a.alias.length - b.alias.length,
      sortDirections: ['descend', 'ascend'],
      width: '8%',
    },
    {
      title: 'Number',
      dataIndex: 'number',
      width: '8%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '6%',
      render: (actions, record) => (
        <>
          <motion.div
            onClick={() => handleVisible(record)}
            whileHover={hoverAnimation}
            className='flex center'
          >
            Edit
          </motion.div>
          {renderEditModal(record)}
        </>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      width: '6%',
      render: (actions, record) => (
        <motion.div
          onClick={() => deleteFrequentNumber(record.id)}
          whileHover={hoverAnimation}
          className='flex center'
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </motion.div>
      ),
    },
  ];

  /* Modal para editar un numero frecuente */
  function renderEditModal(record) {
    return (
      <EditFrequentNumber
        dataToEdit={dataToEdit}
        frequentNumberForm={frequentNumberForm}
        visibleEditNumber={
          dataToEdit !== undefined ? dataToEdit.id == record.id : false
        }
        setVisibleEditNumber={() => {
          setDataToEdit(undefined);
        }}
      />
    );
  }

  return (
    <div>
      <Space size='large' direction='vertical'>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className='title-style'>Frequent Number</h1>
        </Row>

        <Search
          placeholder='Search user...'
          enterButton
          style={{ width: 300 }}
        />

        <Space size='large' className='flex space-between'>
          <Space size='small'>
            <label>Show</label>
            <Select defaultValue='10' onChange={onChangeTablePageSize}>
              <Option value='10'>10</Option>
              <Option value='20'>20</Option>
            </Select>
            <label>entries</label>
          </Space>
          <Button
            type='primary'
            className='primary-button-style alternate'
            onClick={() => {
              setVisibleNewFrequentNumber(true);
              setDataToEdit(undefined);
            }}
          >
            <Space className='flex center'>
              New Number <FontAwesomeIcon icon={faPlusCircle} />
            </Space>
          </Button>
        </Space>

        {frequentNumbersTableData && (
          <Table
            loading={loadingTable}
            bordered
            scroll={{ x: 1300 }}
            columns={columns}
            pagination={tablePageSize}
            dataSource={frequentNumbersTableData}
            footer={(currentData) =>
              'Showing ' +
              currentData.length +
              ' of ' +
              frequentNumbersTableData.length +
              ' entries'
            }
          />
        )}

        {/* Modal para agregar nuevo numero frecuente */}
        <AddNewFrequentNumber
          frequentNumberForm={frequentNumberForm}
          visibleNewFrequentNumber={visibleNewFrequentNumber}
          setVisibleNewFrequentNumber={() =>
            setVisibleNewFrequentNumber(!visibleNewFrequentNumber)
          }
        />
      </Space>
    </div>
  );
};

FrequentNumbers.propTypes = {
  frequentNumbersTableData: PropTypes.array,
  frequentNumberForm: PropTypes.object,
};

export default FrequentNumbers;
