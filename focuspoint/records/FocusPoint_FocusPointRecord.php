<?php
namespace Craft;

class FocusPoint_FocusPointRecord extends BaseRecord
{
    public function getTableName()
    {
        return 'focuspoint_focuspoints';
    }

    protected function defineAttributes()
    {
        return array(
            'focusX' => AttributeType::String,
            'focusY' => AttributeType::String,
            'sourceId' => AttributeType::Number
        );
    }

    public function defineRelations()
    {
        return array(
            'asset' => array(static::BELONGS_TO, 'AssetFileRecord', 'required' => true),
            'field' => array(static::BELONGS_TO, 'FieldRecord', 'required' => true),
        );
    }
}