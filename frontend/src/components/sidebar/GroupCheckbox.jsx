const GroupCheckbox = ({ isSelected }) => {
    return (
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${isSelected ? "selected" : ""} `}>
                <input
                    type='checkbox'
                    className='checkbox border-slate-900'
                    checked={isSelected}
                    readOnly={true}
                />
            </label>
        </div>
    );
};
export default GroupCheckbox;
