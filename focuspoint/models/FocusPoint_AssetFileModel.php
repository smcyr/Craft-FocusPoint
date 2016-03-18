<?php
namespace Craft;

class FocusPoint_AssetFileModel extends AssetFileModel
{
    protected function defineAttributes()
    {
        return array_merge(parent::defineAttributes(), array(
            'focusX' => AttributeType::Number,
            'focusY' => AttributeType::Number
        ));
    }

    public function focusPctX()
    {
        return ((parent::getAttribute("x") + 1) / 2) * 100;
    }

    public function focusPctY()
    {
        return ((parent::getAttribute("y") + 1) / 2) * 100;
    }
}