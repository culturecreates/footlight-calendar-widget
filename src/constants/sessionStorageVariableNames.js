export const getDefaultSessionStorageVariableNames = (index) => {
  return {
    WidgetSearchDate: 'widgetSearchDate' + index,
    WidgetStartDate: 'widgetStartDate' + index,
    WidgetEndDate: 'widgetEndDate' + index,
    WidgetSearchKeyWord: 'widgetSearchKeyWord' + index,
  };
};
