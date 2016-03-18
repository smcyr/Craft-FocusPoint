<?php
namespace Craft;

class FocusPoint_FocusPointModel extends BaseModel
{
    protected function defineAttributes()
    {
        return array(
            'focusX' => AttributeType::String,
            'focusY' => AttributeType::String,
            'assetId' => AttributeType::Number,
            'fieldId' => AttributeType::Number,
            'sourceId' => AttributeType::Number
        );
    }
}