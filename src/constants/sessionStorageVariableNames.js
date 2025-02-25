export const getDefaultSessionStorageVariableNames = (index = 1) => {
  return {
    WidgetSearchDate: 'widgetSearchDate' + index,
    WidgetStartDate: 'widgetStartDate' + index,
    WidgetEndDate: 'widgetEndDate' + index,
    WidgetSearchKeyWord: 'widgetSearchKeyWord' + index,
  };
};
