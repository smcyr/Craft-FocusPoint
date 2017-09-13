<?php
namespace Craft;

class FocusPoint_AssetElementType extends AssetElementType
{
    public function getName()
    {
        return Craft::t('Focus Point Assets');
    }

    public function populateElementModel($row)
    {
        $model = FocusPoint_AssetFileModel::populateModel($row);
        return $model;
    }
    
    /**
	 * Adds the focusX and focusY points to the row that populates the model. This
	 * allows the focus point to still work with eager loading.
	 * 
	 * @param DbCommand $query
	 * @param ElementCriteriaModel $criteria
	 */
	public function modifyElementsQuery(DbCommand $query, ElementCriteriaModel $criteria)
	{
		$query
			->addSelect('ff.focusX, ff.focusY')
			->leftJoin('focuspoint_focuspoints ff', 'ff.assetId = elements.id');

		parent::modifyElementsQuery($query, $criteria);
	}
}
