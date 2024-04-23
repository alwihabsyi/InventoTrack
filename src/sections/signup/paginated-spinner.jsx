import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import React, { useRef, useState, useEffect, useCallback } from 'react';

import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const PaginatedSpinner = ({ onSelectUnit }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState('');
    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://inventotrack-api.test/api/v1/unit?page=${currentPage}`);
                const result = await response.json();
                setData((prevData) => {
                    const newData = result.data.filter((item) => !prevData.find((prevItem) => prevItem.id === item.id));
                    return [...prevData, ...newData];
                });
                setTotalPages(result.meta.last_page);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }, [currentPage, totalPages]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        });

        const currentLoaderRef = loaderRef.current;

        if (currentLoaderRef) {
            observer.observe(currentLoaderRef);
        }

        return () => {
            if (currentLoaderRef) {
                observer.unobserve(currentLoaderRef);
            }
        };
    }, [loaderRef, handleObserver, currentPage, totalPages]);

    const handleChange = (event) => {
        setSelectedUnit(event.target.value);
        onSelectUnit(event.target.value); // Pass selected unit ID to parent component
    };

    return (
        <div>
            {loading ? (
                <ClipLoader color="#000" loading={loading} size={50} />
            ) : (
                <div>
                    <FormControl fullWidth >
                        <InputLabel>Select Unit</InputLabel>
                        <Select value={selectedUnit} onChange={handleChange}>
                            {data.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.namaUnit}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div ref={loaderRef} />
                </div>
            )}
        </div>
    );
};

PaginatedSpinner.propTypes = {
    onSelectUnit: PropTypes.func.isRequired
};

export default PaginatedSpinner;
