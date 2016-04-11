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
        return ((parent::getAttribute("focusX") + 1) / 2) * 100;
    }

    public function focusPctY()
    {
        return ((parent::getAttribute("focusY") - 1) / 2) * -100;
    }
}