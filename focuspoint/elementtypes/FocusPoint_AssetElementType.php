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
}